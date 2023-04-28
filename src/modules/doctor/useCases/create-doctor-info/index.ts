import { DoctorInfoPrismaRepository } from "../../repositories/implementations/prisma/doctor-info.prisma.repository";
import { DoctorPrismaRepository } from "./../../repositories/implementations/prisma/doctor.prisma.repository";
import { CreateDoctorInfoController } from "./create-doctor-info.controller";
import { CreateDoctorInfoUseCase } from "./create-doctor-info.usecase";

const doctorPrismaRepository = new DoctorPrismaRepository();
const doctorInfoPrismaRepository = new DoctorInfoPrismaRepository();

const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(
  doctorPrismaRepository,
  doctorInfoPrismaRepository
);

const createDoctorInfoController = new CreateDoctorInfoController(
  createDoctorInfoUseCase
);

export { createDoctorInfoController };
