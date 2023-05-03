import { ValidationSchemaError } from "./../../../../errors/validation-schema.error";
import { validatorSchema } from "./../../../../infra/shared/validator/zod";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import { CreatePatientUseCase } from "./create-patient.usecase";

export class CreatePatientController {
  constructor(private readonly createPatientUseCase: CreatePatientUseCase) {}

  handle = async (request: Request, response: Response) => {
    try {
      const { body } = request;

      const patientSchema = z.object({
        username: z.string(),
        name: z.string(),
        email: z.string().email({
          message: "You need to insert a valid email",
        }),
        password: z.string(),
      });

      // validação de schema
      validatorSchema(patientSchema, body);

      const patient = await this.createPatientUseCase.execute({
        ...body,
        avatar: body.filename,
      });

      return response.status(StatusCodes.CREATED).json(patient);
    } catch (error: any) {
      if (error instanceof ValidationSchemaError) {
        return response.status(error.statusCode).json(error.errors);
      }
      return response.status(error.statusCode).json(error.message);
    }
  };
}
