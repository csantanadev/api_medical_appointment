import { SpecialityPrismaRepository } from "../../../speciality/repositories/implementations/speciality.prisma.repository";
import { UserPrismaRepository } from "../../../users/repositories/implementations/user.prisma.repository";
import { DoctorPrismaRepository } from "../../repositories/implementations/doctor.prisma.repository";
import { CreateDoctorController } from "./create-doctor.controller";
import { CreateDoctorUseCase } from "./create-doctor.usecase";

const userPrismaRepository = new UserPrismaRepository();
const doctorPrismaRepository = new DoctorPrismaRepository();
const specialityPrismaRepository = new SpecialityPrismaRepository();

const createDoctorUseCase = new CreateDoctorUseCase(userPrismaRepository, doctorPrismaRepository, specialityPrismaRepository);

const createDoctorController = new CreateDoctorController(createDoctorUseCase);

export { createDoctorController }