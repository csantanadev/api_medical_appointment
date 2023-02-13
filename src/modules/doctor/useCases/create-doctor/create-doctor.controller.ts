import { Request, Response } from "express";
import { CreateDoctorUseCase } from './create-doctor.usecase';
import { StatusCodes } from "http-status-codes";

export class CreateDoctorController {

    constructor(private readonly createDoctorUseCase: CreateDoctorUseCase) { }

    handle = async (request: Request, response: Response) => {

        try {
            const data = request.body;

            const doctor = await this.createDoctorUseCase.execute(data);

            return response.status(StatusCodes.CREATED).json(doctor);
        }
        catch (err: any) {
            return response.status(err.statusCode).json({ error: err.message })
        }
    }

}