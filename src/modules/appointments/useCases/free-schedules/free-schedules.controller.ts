import { Request, Response } from "express";
import { FreeScheduleUseCase } from "./free-schedules.usecase";


export class FreeSchedulesController {

    constructor(private readonly freeSchedulesUseCase: FreeScheduleUseCase) { }

    handle = async (request: Request, response: Response) => {

        try {
            const data = await this.freeSchedulesUseCase.execute(request.body);
            return response.json(data);
        }
        catch (error: any) {
            return response.status(error.statusCode ?? 500).json({ message: error.message });
        }
    }

}