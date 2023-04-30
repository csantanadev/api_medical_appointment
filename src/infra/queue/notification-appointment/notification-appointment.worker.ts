import { formatDate } from "../../../utils/date";
import { EtherealMailProvider } from "../../providers/mail/implementations/ethereal.mail.provider";

export type NotificationTask = {
  email: string;
  date: Date;
};

const mailProvider = new EtherealMailProvider();

export const notificationAppointmentWorker = async ({
  email,
  date,
}: NotificationTask): Promise<void> => {

  console.log(`Enviando email para: ${email}`);

  await mailProvider.sendMail({
    to: email,
    from: "Agendamento de consulta <noreplay@agendamedico.com.br>",
    html: `
      Não se esqueça da sua consulta hoje as  ${formatDate(date, "HH:mm")}
    `,
    subject: "Lembrete de Agendamento de consulta",
  });
};
