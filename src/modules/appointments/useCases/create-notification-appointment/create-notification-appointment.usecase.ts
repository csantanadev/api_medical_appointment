import { IMailProvider } from "../../../../infra/providers/mail/mail.provider";
import { formatDate } from "../../../../utils/date";
import { IAppointmentRepository } from "../../repositories/appointment.repository";

export class CreateNotificationAppointmentUseCase {
  constructor(
    private appointmentRepository: IAppointmentRepository,
    private mailProvider: IMailProvider
  ) {}

  async execute() {
    const appointments =
      await this.appointmentRepository.findAllTodayIncludePatients();

    appointments.forEach(async (app) => {
      const emailPatient = app.patient.email;
      const date = app.date;

      // enviar email
      await this.mailProvider.sendMail({
        to: emailPatient,
        from: "Agendamento de consulta <noreplay@agendamedico.com.br>",
        html: `
          Não se esqueça da sua consulta hoje as  ${formatDate(date, "HH:mm")}
        `,
        subject: "Lembrete de Agendamento de consulta",
      });
    });
  }
}
