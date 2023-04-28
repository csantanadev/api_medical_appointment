import { StatusCodes } from "http-status-codes";
import { CustomError } from "../../../../errors/custom.error";
import { formatDate, getDayOfWeek } from "../../../../utils/date";
import { IAppointmentRepository } from "../../repositories/appointment.repository";
import { IDoctorScheduleRepository } from "./../../../doctor/repositories/doctor-schedule.repository";
import dayjs from "dayjs";

type FreeScheduleRequest = {
  doctorId: string;
  date: string;
};

type FreeTime = {
  time: string;
};

type FreeScheduleResponse = {
  doctorId: string;
  freeTime: FreeTime[];
};

export class FreeScheduleUseCase {
  constructor(
    private doctorScheduleRepository: IDoctorScheduleRepository,
    private appointmentRepository: IAppointmentRepository
  ) {}

  async execute(data: FreeScheduleRequest): Promise<FreeScheduleResponse> {
    if (!data.doctorId) {
      throw new CustomError("Doctor is required.", StatusCodes.BAD_REQUEST);
    }

    if (!data.date) {
      throw new CustomError(
        "You need to select a date.",
        StatusCodes.BAD_REQUEST
      );
    }

    const dayOfWeek = getDayOfWeek(data.date);

    const doctorSchedule =
      await this.doctorScheduleRepository.findByDoctorIdAndDayOfWeek(
        data.doctorId,
        dayOfWeek
      );

    if (!doctorSchedule) {
      throw new CustomError(
        "Doctor does not attend that day.",
        StatusCodes.BAD_REQUEST
      );
    }

    const appointmentsByDoctorAndDate =
      await this.appointmentRepository.findAllSchedulesByDoctorAndDate(
        data.doctorId,
        data.date
      );

    const startAt = doctorSchedule.startAt; // 09:00
    const endAt = doctorSchedule.endAt; // 18:00
    const duration = doctorSchedule.doctor.doctorInfo.duration;

    let timeNow = startAt;

    const freeTime: FreeTime[] = [];

    while (timeNow <= endAt) {
      const existsAppointment = appointmentsByDoctorAndDate.find(
        (app) => formatDate(app.date, "HH:mm") === timeNow
      );

      if (!existsAppointment) {
        freeTime.push({
          time: timeNow,
        });
      }

      timeNow = dayjs(data.date + timeNow)
        .add(duration, "minute")
        .format("HH:mm"); // add 30 min a cada volta
    }

    return {
      doctorId: data.doctorId,
      freeTime,
    };
  }
}
