import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { logger } from "../../../../utils/logger";
import { CreateUserUseCase } from "./create-user.usecase";

export class CreateUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  handle = async (request: Request, response: Response) => {
    logger.info("Usuário sendo criado");

    try {
      const data = request.body;

      const user = await this.createUserUseCase.execute(data);

      return response.status(StatusCodes.CREATED).json(user);
    } catch (err: any) {
      return response.status(err.statusCode).json({ error: err.message });
    }
  };
}
