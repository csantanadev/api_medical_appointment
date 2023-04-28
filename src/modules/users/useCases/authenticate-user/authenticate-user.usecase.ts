import { IToken } from "./../../../../infra/shared/token/token";
import { IPasswordCrypto } from "./../../../../infra/shared/crypto/password.crypto";
import { IUserRepository } from "./../../repositories/user.repository";
import { StatusCodes } from "http-status-codes";
import { CustomError } from "../../../../errors/custom.error";

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

    return tokenGenerated;
  }
}
