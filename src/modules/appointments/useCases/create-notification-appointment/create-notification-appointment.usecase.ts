import { queueAppointmentNotification } from "../../../../infra/queue/notification-appointment/notification-appointment.queue";
import { IAppointmentRepository } from "../../repositories/appointment.repository";

export class CreateNotificationAppointmentUseCase {
  constructor(private appointmentRepository: IAppointmentRepository) {}

  async execute() {
    const appointments =
      await this.appointmentRepository.findAllTodayIncludePatients();

    appointments.forEach(async (app) => {
      const emailPatient = app.patient.email;
      const date = app.date;

      // adicionando na fila que envia o email
      await queueAppointmentNotification.push({
        email: emailPatient,
        date,
      });
    });
  }
}
