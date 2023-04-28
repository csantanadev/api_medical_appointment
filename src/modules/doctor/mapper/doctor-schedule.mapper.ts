import { randomUUID } from "crypto";
import { DoctorSchedule } from "../entities/doctor-schedule.entity";
import {
  Doctor,
  DoctorInfo,
  DoctorSchedules as DoctorSchedulePrisma,
} from "@prisma/client";

export type DoctorScheduleWeek = {
  startAt: string;
  endAt: string;
  dayOfWeek: number;
  doctorId: string;
  doctor: {
    doctorInfo: {
      duration: number;
    };
  };
};

export class DoctorScheduleMapper {
  static entityToPrisma(data: DoctorSchedule): DoctorSchedulePrisma[] {
    const doctorSchedulePrisma: DoctorSchedulePrisma[] = [];

    data.schedules.forEach((schedule) => {
      doctorSchedulePrisma.push({
        day_of_week: schedule.dayOfWeek,
        start_at: schedule.startAt,
        end_at: schedule.endAt,
        doctor_id: data.doctorId,
        id: schedule.id ?? randomUUID(),
      });
    });

    return doctorSchedulePrisma;
  }

  static prismaToEntity(
    schedule: DoctorSchedulePrisma & {
      doctor: Doctor & { doctorInfo: DoctorInfo | null};
    }
  ): DoctorScheduleWeek {
    return {
      doctorId: schedule.doctor_id,
      startAt: schedule.start_at,
      endAt: schedule.end_at,
      dayOfWeek: schedule.day_of_week,
      doctor: {
        doctorInfo: {
          duration: schedule.doctor.doctorInfo?.duration || 0,
        },
      },
    };
  }
}
