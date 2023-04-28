import { StatusCodes } from "http-status-codes";
import { ErrorSchema } from "../infra/shared/validator/zod";

export class ValidationSchemaError extends Error {
  statusCode: number;
  errors: ErrorSchema[];

  constructor(message: string, errors: ErrorSchema[] = []) {
    super(message);
    this.errors = errors;
    this.statusCode = StatusCodes.UNPROCESSABLE_ENTITY; // 422
  }
}
