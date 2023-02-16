import { DoctorSchedulePrismaRepository } from "../../repositories/implementations/prisma/doctor-schedule.prisma.repository";
import { DoctorPrismaRepository } from "../../repositories/implementations/prisma/doctor.prisma.repository";
import { CreateDoctorScheduleController } from "./create-doctor-schedule.controller"
import { CreateDoctorScheduleUseCase } from "./create-doctor-schedule.usecase";


const doctorPrismaRepository = new DoctorPrismaRepository();
const doctorSchedulePrismaRespository = new DoctorSchedulePrismaRepository();

const createDoctorScheduleUseCase = new CreateDoctorScheduleUseCase(doctorPrismaRepository, doctorSchedulePrismaRespository);

const createDoctorScheduleController = new CreateDoctorScheduleController(createDoctorScheduleUseCase);

export { createDoctorScheduleController }