import { Patient } from "./../../../entities/patient.entity";
import { prismaClient } from "../../../../../infra/databases/prisma.config";
import { IPatientRepository } from "../../patient.repository";
import { PatientMapper } from "../../../../doctor/mapper/patient.mapper";
import { PatientWithUserDTO } from "../../../dto/patient.dto";

export class PatientPrismaRepository implements IPatientRepository {
  async save(data: Patient): Promise<Patient> {
    const patient = await prismaClient.patient.create({
      data: {
        document: data.document,
        email: data.email,
        user_id: data.userId,
      },
    });

    return PatientMapper.PrismaToEntityPatient(patient);
  }

  async findByDocument(document: string): Promise<Patient | null> {
    const patient = await prismaClient.patient.findUnique({
      where: { document },
    });

    return patient ? PatientMapper.PrismaToEntityPatient(patient) : null;
  }

  async findById(id: string): Promise<Patient | null> {
    const patient = await prismaClient.patient.findUnique({
      where: { id },
    });

    return patient ? PatientMapper.PrismaToEntityPatient(patient) : null;
  }

  async findByUserId(userId: string): Promise<PatientWithUserDTO | null> {
    const patient = await prismaClient.patient.findUnique({
      where: {
        user_id: userId,
      },
      include: {
        user: true
      }
    });

    return patient ? PatientMapper.PrismaToEntityIncludesUser(patient) : null;
  }

  async findByDocumentOrEmail(
    document: string,
    email: string
  ): Promise<Patient | null> {
    const patient = await prismaClient.patient.findFirst({
      where: {
        OR: [{ document }, { email }],
      },
    });

    return patient ? PatientMapper.PrismaToEntityPatient(patient) : null;
  }
}
