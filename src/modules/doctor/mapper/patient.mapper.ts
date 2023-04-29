import { PatientWithUserDTO } from "../../patient/dto/patient.dto";
import { Patient } from "../../patient/entities/patient.entity";
import { Patient as PatientPrisma, User as UserPrisma } from "@prisma/client";

export class PatientMapper {
  static EntityPatientToPrisma(data: Patient): PatientPrisma {
    return {
      ...data,
      user_id: data.userId,
      createdAt: new Date(),
    };
  }

  static PrismaToEntityPatient(data: PatientPrisma): Patient {
    return {
      ...data,
      userId: data.user_id,
    };
  }

  static PrismaToEntityIncludesUser(
    data: PatientPrisma & { user: UserPrisma }
  ): PatientWithUserDTO {
    return {
      ...data,
      userId: data.user_id,
      user: {
        name: data.user.name,
      },
    };
  }
}
