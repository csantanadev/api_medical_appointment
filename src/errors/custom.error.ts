import { StatusCodes } from "http-status-codes";

export class CustomError extends Error {

    statusCode: number;
    name: string;

    constructor(message: string, statusCode: StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR, name: string = '') {
        super(message);
        this.name = name
        this.statusCode = statusCode;
    }


}