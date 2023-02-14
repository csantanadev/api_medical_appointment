import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CreateDoctorInfoUseCase } from "./create-doctor-info.usecase";

export class CreateDoctorInfoController {

    constructor(private readonly createDoctorInfoUseCase: CreateDoctorInfoUseCase) { }

    handle = async (request: Request, response: Response) => {

        try {
            const { body, userId } = request; // userId vem do middleware

            const doctorInfo = await this.createDoctorInfoUseCase.execute(body, userId);

            return response.status(StatusCodes.CREATED).json(doctorInfo);
        }
        catch (err: any) {
            return response.status(err.statusCode).json({ error: err.message })
        }
    }

}