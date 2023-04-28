import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AuthenticateUserUseCase } from "./authenticate-user.usecase";

export class AuthenticateUserController {
  constructor(
    private readonly authenticateUserUseCase: AuthenticateUserUseCase
  ) {}

  handle = async (request: Request, response: Response) => {
    try {
      const data = request.body;

      const token = await this.authenticateUserUseCase.execute(data);

      return response.status(StatusCodes.OK).json({ token });
    } catch (err: any) {
      return response.status(err.statusCode).json({ error: err.message });
    }
  };
}
