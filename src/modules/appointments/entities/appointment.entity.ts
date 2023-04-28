import { StatusCodes } from "http-status-codes";
import { randomUUID } from "crypto";
import { CustomError } from "../../../errors/custom.error";

export type AppointmentProps = {
  patientId: string;
  doctorId: string;
  date: Date
};

export class Appointment {
  readonly id?: string;
  patientId: string;
  doctorId: string;
  date: Date
  note?: string
  isFinished: boolean


  private constructor(props: AppointmentProps) {
    this.id = randomUUID();
    this.patientId = props.patientId
    this.doctorId = props.doctorId
    this.date = props.date
    this.isFinished = false;
  }

  static create(props: AppointmentProps) {
    /*if (!props.crm) {
      throw new CustomError(
        "CRM name is required.",
        StatusCodes.UNPROCESSABLE_ENTITY,
        "PARAMETER_REQUIRED"
      );
    }
    if (props.crm.length !== 6) {
      throw new CustomError(
        "CRM length is incorrect.",
        StatusCodes.UNPROCESSABLE_ENTITY,
        "PARAMETER_REQUIRED"
      );
    }
    if (!props.email) {
      throw new CustomError(
        "Email name is required.",
        StatusCodes.UNPROCESSABLE_ENTITY,
        "PARAMETER_REQUIRED"
      );
    }*/

    const appointment = new Appointment(props);
    return appointment;
  }
}
