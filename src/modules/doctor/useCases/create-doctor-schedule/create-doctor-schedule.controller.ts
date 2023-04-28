import { ValidationSchemaError } from "./../../../../errors/validation-schema.error";
import { validatorSchema } from "./../../../../infra/shared/validator/zod";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { z } from "zod";
import { CreateDoctorScheduleUseCase } from "./create-doctor-schedule.usecase";

export class CreateDoctorScheduleController {
  constructor(
    private readonly createDoctorScheduleUseCase: CreateDoctorScheduleUseCase
  ) {}

  handle = async (request: Request, response: Response) => {
    try {
      const { body, userId } = request;

      await this.createDoctorScheduleUseCase.execute(body, userId);

      return response.status(StatusCodes.CREATED).end();
    } catch (error: any) {
      if (error instanceof ValidationSchemaError) {
        return response.status(error.statusCode).json(error.errors);
      }
      return response.status(error.statusCode).json(error.message);
    }
  };
}
