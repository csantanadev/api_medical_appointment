import cron from "node-cron";
import { AppointmentPrismaRepository } from "../../modules/appointments/repositories/implementations/prisma/appointment.prisma.repository";
import { CreateNotificationAppointmentUseCase } from "../../modules/appointments/useCases/create-notification-appointment/create-notification-appointment.usecase";

// Para rodar uma vez ao dia (quando o dia iniciar -> '0 0 0 * * *')
// A cada 15 segundos
cron.schedule("*/15 * * * * *", async () => {
  const appointmentPrismaRepository = new AppointmentPrismaRepository();
  const createNotificationAppointmentUseCase =
    new CreateNotificationAppointmentUseCase(appointmentPrismaRepository);

  await createNotificationAppointmentUseCase.execute();
});
