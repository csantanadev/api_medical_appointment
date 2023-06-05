import { StatusCodes } from "http-status-codes";

export class TokenError extends Error {
  statusCode: number;
  name: string;

  constructor(
    message: string,
    statusCode: StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR,
    name: string = "TOKEN_ERROR"
  ) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
  }
}
