import { DoctorInfoPrismaRepository } from "../../../doctor/repositories/implementations/prisma/doctor-info.prisma.repository";
import { DoctorSchedulePrismaRepository } from "../../../doctor/repositories/implementations/prisma/doctor-schedule.prisma.repository";
import { AppointmentPrismaRepository } from "../../repositories/implementations/prisma/appointment.prisma.repository";
import { FreeSchedulesController } from "./free-schedules.controller";
import { FreeScheduleUseCase } from "./free-schedules.usecase";


const doctorSchedulePrismaRepository = new DoctorSchedulePrismaRepository();
const appointmentPrismaRepository = new AppointmentPrismaRepository();
const doctorInfoPrismaRepository = new DoctorInfoPrismaRepository();

const freeSchedulesUseCase = new FreeScheduleUseCase(doctorSchedulePrismaRepository, appointmentPrismaRepository, doctorInfoPrismaRepository);

const freeSchedulesController = new FreeSchedulesController(freeSchedulesUseCase);

export { freeSchedulesController }