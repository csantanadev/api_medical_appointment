import { Request, Response } from "express";
import { RefreshTokenUserUseCase } from "./refresh-token.usecase";
import { TokenError } from "../../../../errors/token.error";

export class RefreshTokenController {

  constructor(private refreshTokenUseCase : RefreshTokenUserUseCase) {}

  handle = async (request: Request, response: Response) => {
    try {
      
      const { refreshToken } = request.body;
      const result = await this.refreshTokenUseCase.execute(refreshToken);
      return response.json(result);

    } catch (error) {
      if (error instanceof TokenError) {
        return response.status(error.statusCode).json(error.message);
      }
    }
  };
}
