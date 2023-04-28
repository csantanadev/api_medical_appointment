import { Patient } from "../../patient/entities/patient.entity";
import { Patient as PatientPrisma } from "@prisma/client";

export class PatientMapper {
  static PrismaToEntityPatient(data: PatientPrisma): Patient {
    return {
      ...data,
      userId: data.user_id,
    };
  }

  static EntityPatientToPrisma(data: Patient): PatientPrisma {
    return {
      ...data,
      user_id: data.userId,
      createdAt: new Date(),
    };
  }
}
