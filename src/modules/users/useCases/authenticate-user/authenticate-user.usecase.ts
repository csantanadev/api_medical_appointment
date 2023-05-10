import { IToken } from "./../../../../infra/shared/token/token";
import { IPasswordCrypto } from "./../../../../infra/shared/crypto/password.crypto";
import { IUserRepository } from "./../../repositories/user.repository";
import { StatusCodes } from "http-status-codes";
import { CustomError } from "../../../../errors/custom.error";
import { sign } from "jsonwebtoken";
import { CreateConnectionRedis } from "../../../../infra/providers/redis";

type AuthenticateRequest = {
  username: string;
  password: string;
};

export class AuthenticateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordCrypto: IPasswordCrypto,
    private readonly token: IToken
  ) {}

  async execute({ username, password }: AuthenticateRequest) {
    if (!username || !password) {
      throw new CustomError(
        "Username / Password incorrect.",
        StatusCodes.UNAUTHORIZED,
        "USER_UNAUTHORIZED"
      );
    }

    const user = await this.userRepository.findByUserName(username);

    if (!user) {
      throw new CustomError(
        "Username / Password incorrect.",
        StatusCodes.UNAUTHORIZED,
        "USER_UNAUTHORIZED"
      );
    }

    const comparePasswordEquals = await this.passwordCrypto.compare(
      password,
      user.password
    );

    if (!comparePasswordEquals) {
      throw new CustomError(
        "Username / Password incorrect.",
        StatusCodes.UNAUTHORIZED,
        "USER_UNAUTHORIZED"
      );
    }

    const tokenGenerated = this.token.create(user);

    // gerar um refresh token e salvar no redis
    const refreshToken = sign({}, process.env.SECRET_KEY_REFRESH_TOKEN || "", {
      subject: user.id,
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    });

    // salvando no redis
    const redisClient = new CreateConnectionRedis();
    await redisClient.setValue(user.id, refreshToken);

    return {
      token: tokenGenerated,
      refreshToken,
    };
  }
}
