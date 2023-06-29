import * as fastq from "fastq";
import type { queueAsPromised } from "fastq";
import {
  NotificationTask,
  notificationAppointmentWorker,
} from "./notification-appointment.worker";

//Fastq, in memory work queue.
const queueAppointmentNotification: queueAsPromised<NotificationTask> =
  fastq.promise(notificationAppointmentWorker, 1);

export { queueAppointmentNotification };
