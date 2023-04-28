import { StatusCodes } from "http-status-codes";
import { CustomError } from "../../../../errors/custom.error";
import { IDoctorRepository } from "../../../doctor/repositories/doctor.repository";
import { IPatientRepository } from "../../../patient/repositories/patient.repository";
import {
  dateToString,
  formatDate,
  formatDateUTC,
  getDayOfWeek,
} from "../../../../utils/date";
import { IDoctorScheduleRepository } from "../../../doctor/repositories/doctor-schedule.repository";
import { IAppointmentRepository } from "../../repositories/appointment.repository";
import { Appointment } from "../../entities/appointment.entity";

export type CreateAppointmentRequest = {
  doctorId: string;
  date: Date;
};

export class CreateAppointmentUseCase {
  constructor(
    private patientRepository: IPatientRepository,
    private doctorRepository: IDoctorRepository,
    private doctorScheduleRepository: IDoctorScheduleRepository,
    private appointmentRepository: IAppointmentRepository
  ) {}

  async execute(data: CreateAppointmentRequest, userId: string) {
    const patientExists = await this.patientRepository.findByUserId(userId);

    if (!patientExists) {
      throw new CustomError(
        "Patient does not exists.",
        StatusCodes.BAD_REQUEST
      );
    }

    const doctorExists = await this.doctorRepository.findById(data.doctorId);
    if (!doctorExists) {
      throw new CustomError("Doctor does not exists.", StatusCodes.BAD_REQUEST);
    }

    const dayOfWeek = getDayOfWeek(dateToString(data.date));

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

    const dateFormat = formatDate(data.date, "YYYY-MM-DD HH:mm");

    // validar se horaro esta vazio
    const existsAppointmentDoctor =
      await this.appointmentRepository.findAppointmentByDoctorAndDatetime(
        doctorExists.id,
        dateFormat
      );

    if (existsAppointmentDoctor) {
      throw new CustomError(
        "There is already an appointment for this time.",
        StatusCodes.BAD_REQUEST
      );
    }

    // validar se o paciente não tem atendimeto
    const existsAppointmentPatient =
      await this.appointmentRepository.findAppointmentByPatientAndDatetime(
        doctorExists.id,
        dateFormat
      );

    if (existsAppointmentPatient) {
      throw new CustomError(
        "There is already an appointment for this patient.",
        StatusCodes.BAD_REQUEST
      );
    }

    // salvar o agendamento
    const appointment = Appointment.create({
      date: data.date,
      doctorId: doctorExists.id,
      patientId: patientExists.id,
    });

    await this.appointmentRepository.save(appointment);
  }
}
