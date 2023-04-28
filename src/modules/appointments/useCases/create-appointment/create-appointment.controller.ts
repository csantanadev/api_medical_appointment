import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { CreateAppointmentUseCase } from "./create-appointment.usecase";

export class CreateAppointmentController {
  constructor(
    private readonly createAppointmentUseCase: CreateAppointmentUseCase
  ) {}

  handle = async (request: Request, response: Response) => {
    try {
      await this.createAppointmentUseCase.execute(request.body, request.userId);

      return response.status(StatusCodes.CREATED).json({
        message: "Appointment created successfully",
      });
    } catch (error: any) {
      return response
        .status(error.statusCode ?? 500)
        .json({ message: error.message });
    }
  };
}
