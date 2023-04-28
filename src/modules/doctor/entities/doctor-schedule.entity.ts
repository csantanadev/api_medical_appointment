import { StatusCodes } from "http-status-codes";
import { randomUUID } from "crypto";
import { CustomError } from "../../../errors/custom.error";
import { compareEndTimeIsAfter, validateTime } from "../../../utils/date";

type Schedules = {
  id?: string;
  startAt: string;
  endAt: string;
  dayOfWeek: number;
};

export type DoctorScheduleProps = {
  doctorId: string;
  schedules: Schedules[];
};

export class DoctorSchedule {
  doctorId: string;
  schedules: Schedules[];

  private constructor(props: DoctorScheduleProps) {
    if (!props.doctorId) {
      throw new CustomError(
        "Doctor does not exists.",
        StatusCodes.UNPROCESSABLE_ENTITY,
        "PARAMETER_REQUIRED"
      );
    }
    if (!props.schedules) {
      throw new CustomError(
        "Invalid schedules.",
        StatusCodes.UNPROCESSABLE_ENTITY,
        "PARAMETER_REQUIRED"
      );
    }
    // validator
    this.validateSchedules(props.schedules);

    this.doctorId = props.doctorId;
    this.schedules = this.createSchedules(props.schedules);
  }

  static create(props: DoctorScheduleProps) {
    const doctorSchedule = new DoctorSchedule(props);
    return doctorSchedule;
  }

  private validateSchedules(schedules: Schedules[]) {
    // validando as duplicidades
    const hasUniqueValue = new Set(
      schedules.map((schedule) => schedule.dayOfWeek)
    );

    if (hasUniqueValue.size < schedules.length) {
      throw new CustomError("Duplicate Day of Week.", StatusCodes.BAD_REQUEST);
    }

    // validando os horarios
    schedules.forEach((schedule) => {
      if (!validateTime(schedule.startAt)) {
        throw new CustomError(
          "Invalid StartAt.",
          StatusCodes.UNPROCESSABLE_ENTITY
        );
      }
      if (!validateTime(schedule.endAt)) {
        throw new CustomError(
          "Invalid EndAt.",
          StatusCodes.UNPROCESSABLE_ENTITY
        );
      }
      if (!compareEndTimeIsAfter(schedule.startAt, schedule.endAt)) {
        throw new CustomError(
          "End time cannot be earlier than start time.",
          StatusCodes.UNPROCESSABLE_ENTITY
        );
      }
    });
  }

  private createSchedules(schedules: Schedules[]) {
    return schedules.map((schedule) => {
      return {
        ...schedule,
        id: randomUUID(),
      };
    });
  }
}
