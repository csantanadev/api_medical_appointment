import { DoctorSchedule } from "../entities/doctor-schedule.entity";

export interface IDoctorScheduleRepository {
    save(data: DoctorSchedule) : Promise<void>
}