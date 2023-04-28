import { ValidationSchemaError } from "./../../../../errors/validation-schema.error";
import { validatorSchema } from "./../../../../infra/shared/validator/zod";
import { Request, Response } from "express";
import { CreateDoctorUseCase } from "./create-doctor.usecase";
import { StatusCodes } from "http-status-codes";

import { z } from "zod";

export class CreateDoctorController {
  constructor(private readonly createDoctorUseCase: CreateDoctorUseCase) {}

  handle = async (request: Request, response: Response) => {
    try {
      const { body } = request;

      const doctorSchema = z.object({
        username: z.string(),
        name: z.string(),
        email: z.string().email({
          message: "You need to insert a valid email",
        }),
        password: z.string(),
        crm: z.string().length(6, {
          message: "CRM must contain 6 characteres",
        }),
        specialityId: z.string().uuid({
          message: "You need to insert a valid specialityId",
        }),
      });

      // validação de schema
      validatorSchema(doctorSchema, body);

      const doctor = await this.createDoctorUseCase.execute(body);

      return response.status(StatusCodes.CREATED).json(doctor);
    } catch (error: any) {
      if (error instanceof ValidationSchemaError) {
        return response.status(error.statusCode).json(error.errors);
      }
      return response.status(error.statusCode).json(error.message);
    }
  };
}
