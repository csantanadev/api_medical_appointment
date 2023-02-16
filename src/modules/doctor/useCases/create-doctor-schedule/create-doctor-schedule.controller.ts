import { ValidationSchemaError } from './../../../../errors/validation-schema.error';
import { validatorSchema } from './../../../../infra/shared/validator/zod';
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { z } from 'zod';
import { CreateDoctorScheduleUseCase } from './create-doctor-schedule.usecase';


export class CreateDoctorScheduleController {

    constructor(private readonly createDoctorScheduleUseCase: CreateDoctorScheduleUseCase) { }

    handle = async (request: Request, response: Response) => {

        try {
            const { body, userId } = request;

            console.log('body', body)
            console.log('userId', userId)


         /*   const doctorSchema = z.object({
                username: z.string(),
                name: z.string(),
                email: z.string().email({
                    message: 'You need to insert a valid email'
                }),
                password: z.string(),
                crm: z.string().length(6, {
                    message: 'CRM must contain 6 characteres'
                }),
                specialityId: z.string().uuid({
                    message: 'You need to insert a valid specialityId'
                })
            });

            // validação de schema
            validatorSchema(doctorSchema, body); */

            const schedules = {
                schedules : body
            }
            const doctorSchedule = await this.createDoctorScheduleUseCase.execute(schedules, userId);

            return response.status(StatusCodes.CREATED).json(doctorSchedule);
        }
        catch (error: any) {
            if (error instanceof ValidationSchemaError) {
                return response.status(error.statusCode).json(error.errors);
            }
            return response.status(error.statusCode).json(error.message);
        }
    }

}