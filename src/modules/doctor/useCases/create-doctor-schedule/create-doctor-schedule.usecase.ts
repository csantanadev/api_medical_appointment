import { StatusCodes } from "http-status-codes";
import { CustomError } from "../../../../errors/custom.error";
import { DoctorSchedule } from "../../entities/doctor-schedule.entity";
import { IDoctorScheduleRepository } from "../../repositories/doctor-schedule.repository";
import { IDoctorRepository } from "../../repositories/doctor.repository";

export type CreateDoctorScheduleRequest = {
    schedules: DoctorSchedulesRequest[]
}

type DoctorSchedulesRequest = {
    startAt: string
    endAt: string
    dayOfWeek: number
}

export class CreateDoctorScheduleUseCase {

    constructor(private doctorRepository: IDoctorRepository, 
        private doctorScheduleRepository: IDoctorScheduleRepository) {}

    async execute(data: CreateDoctorScheduleRequest, userId: string) {

        const doctorExists = await this.doctorRepository.findByUserId(userId);

        if(!doctorExists) {
            throw new  CustomError('Doctor does not exists.', StatusCodes.BAD_REQUEST);
        }

        const doctorSchedule = DoctorSchedule.create({
            doctorId: doctorExists.id,
            schedules: data.schedules 
        });

        const doctorScheduleCreated = await this.doctorScheduleRepository.save(doctorSchedule);

        return doctorScheduleCreated;
    }


}