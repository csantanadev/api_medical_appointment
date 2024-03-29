import { DoctorWithUserDTO } from "../dto/doctor.dto";
import { Doctor } from "../entities/doctor.entity";
import { Doctor as DoctorPrisma, User as UserPrisma } from "@prisma/client";

export class DoctorMapper {
  static PrismaToEntityDoctor(data: DoctorPrisma): Doctor {
    return {
      crm: data.crm,
      email: data.email,
      specialityId: data.speciality_id,
      userId: data.user_id,
      id: data.id,
    };
  }

  static PrismaToEntityDoctorWithUser(
    data: DoctorPrisma & { user: UserPrisma }
  ): DoctorWithUserDTO {
    return {
      crm: data.crm,
      email: data.email,
      specialityId: data.speciality_id,
      userId: data.user_id,
      id: data.id,
      user: {
        name: data.user.name,
      },
    };
  }
}
