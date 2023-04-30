import * as fastq from "fastq";
import type { queueAsPromised } from "fastq";
import {
  NotificationTask,
  notificationAppointmentWorker,
} from "./notification-appointment.worker";

const queueAppointmentNotification: queueAsPromised<NotificationTask> =
  fastq.promise(notificationAppointmentWorker, 1);

export { queueAppointmentNotification };
