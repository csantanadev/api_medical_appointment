import { DoctorSchedulePrismaRepository } from "../../../doctor/repositories/implementations/prisma/doctor-schedule.prisma.repository";
import { AppointmentPrismaRepository } from "../../repositories/implementations/prisma/appointment.prisma.repository";
import { FreeSchedulesController } from "./free-schedules.controller";
import { FreeScheduleUseCase } from "./free-schedules.usecase";

const doctorSchedulePrismaRepository = new DoctorSchedulePrismaRepository();
const appointmentPrismaRepository = new AppointmentPrismaRepository();

const freeSchedulesUseCase = new FreeScheduleUseCase(
  doctorSchedulePrismaRepository,
  appointmentPrismaRepository
);

const freeSchedulesController = new FreeSchedulesController(
  freeSchedulesUseCase
);

export { freeSchedulesController };
