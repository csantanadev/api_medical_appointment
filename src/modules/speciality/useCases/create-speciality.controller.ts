import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CreateSpecialityUseCase } from "./create-speciality.usecase";

export class CreateSpecialityController {

    constructor(private readonly createSpecialityUseCase: CreateSpecialityUseCase) { }

    handle = async (request: Request, response: Response) => {

        try {
            const data = request.body;

            const user = await this.createSpecialityUseCase.execute(data);

            return response.status(StatusCodes.CREATED).json(user);
        }
        catch (err: any) {
            return response.status(err.statusCode).json({ error: err.message })
        }
    }

}