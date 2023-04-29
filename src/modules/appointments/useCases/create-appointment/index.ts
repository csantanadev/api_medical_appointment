import { DoctorPrismaRepository } from "./../../../doctor/repositories/implementations/prisma/doctor.prisma.repository";
import { DoctorSchedulePrismaRepository } from "../../../doctor/repositories/implementations/prisma/doctor-schedule.prisma.repository";
import { PatientPrismaRepository } from "../../../patient/repositories/implementations/prisma/patient.prisma.repository";
import { AppointmentPrismaRepository } from "../../repositories/implementations/prisma/appointment.prisma.repository";
import { CreateAppointmentController } from "./create-appointment.controller";
import { CreateAppointmentUseCase } from "./create-appointment.usecase";
import { EtherealMailProvider } from "../../../../infra/providers/mail/implementations/ethereal.mail.provider";

const patientPrismaRepository = new PatientPrismaRepository();
const doctorPrismaRepository = new DoctorPrismaRepository();
const doctorSchedulePrismaRepository = new DoctorSchedulePrismaRepository();
const appointmentPrismaRepository = new AppointmentPrismaRepository();
const mailEtherealProvider = new EtherealMailProvider();

const createAppointmentUseCase = new CreateAppointmentUseCase(
  patientPrismaRepository,
  doctorPrismaRepository,
  doctorSchedulePrismaRepository,
  appointmentPrismaRepository,
  mailEtherealProvider
);

const createAppointmentController = new CreateAppointmentController(
  createAppointmentUseCase
);

export { createAppointmentController };
