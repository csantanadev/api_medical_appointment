import { sign, verify } from "jsonwebtoken";
import { CreateConnectionRedis } from "../../../../infra/providers/redis";
import { TokenError } from "../../../../errors/token.error";
import { StatusCodes } from "http-status-codes";
import { IToken } from "../../../../infra/shared/token/token";
import { IUserRepository } from "../../repositories/user.repository";


export class RefreshTokenUserUseCase {
  
  constructor(private token: IToken, private userRepository: IUserRepository) {}

  async execute(refreshToken: string) {
    const secret = process.env.SECRET_KEY_REFRESH_TOKEN || "";

    try {
      const { sub } = verify(refreshToken, secret);
      const redisClient = new CreateConnectionRedis();
      const refreshTokenRedis = await redisClient.getValue(String(sub));

      if(refreshToken !== refreshTokenRedis){
        throw new TokenError("Refresh Token incorrect", StatusCodes.UNAUTHORIZED);  
      }

      const user = await this.userRepository.findByUserId(String(sub));

      if(!user) {
        throw new Error("User does not exists!");
      }

      const tokenGenerated = this.token.create(user);

      // gerar um refresh token e salvar no redis
      const newRefreshToken = sign({}, process.env.SECRET_KEY_REFRESH_TOKEN || "", {
        subject: user.id,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
      });
  
      // salvando no redis
      await redisClient.setValue(user.id, newRefreshToken); 
  
      return {
        token: tokenGenerated,
        refreshToken: newRefreshToken,
      };
      
    } catch (err) {
      throw new TokenError("Refresh Token incorrect", StatusCodes.UNAUTHORIZED);  
    }
  }
}
