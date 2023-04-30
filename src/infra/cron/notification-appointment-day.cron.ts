import cron from "node-cron";
import { AppointmentPrismaRepository } from "../../modules/appointments/repositories/implementations/prisma/appointment.prisma.repository";
import { CreateNotificationAppointmentUseCase } from "../../modules/appointments/useCases/create-notification-appointment/create-notification-appointment.usecase";
import { EtherealMailProvider } from "../providers/mail/implementations/ethereal.mail.provider";

cron.schedule("*/15 * * * * *", async () => {
  const appointmentPrismaRepository = new AppointmentPrismaRepository();
  const mailEtherealProvider = new EtherealMailProvider();
  const createNotificationAppointmentUseCase =
    new CreateNotificationAppointmentUseCase(
      appointmentPrismaRepository,
      mailEtherealProvider
    );

  await createNotificationAppointmentUseCase.execute();
});
