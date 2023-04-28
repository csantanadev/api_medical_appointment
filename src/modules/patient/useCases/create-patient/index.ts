import { UserPrismaRepository } from "../../../users/repositories/implementations/user.prisma.repository";
import { PatientPrismaRepository } from "../../repositories/implementations/prisma/patient.prisma.repository";
import { CreatePatientController } from "./create-patient.controller";
import { CreatePatientUseCase } from "./create-patient.usecase";

const userPrismaRepository = new UserPrismaRepository();
const patientPrismaRepository = new PatientPrismaRepository();

const createPatientUseCase = new CreatePatientUseCase(
  userPrismaRepository,
  patientPrismaRepository
);

const createPatientController = new CreatePatientController(
  createPatientUseCase
);

export { createPatientController };
