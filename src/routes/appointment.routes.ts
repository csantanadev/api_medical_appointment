import { Router } from "express";
import { ensureAuthenticate } from "../infra/shared/http/middleware/ensure-authenticate.middleware";
import { freeSchedulesController } from "../modules/appointments/useCases/free-schedules";
import { createAppointmentController } from "../modules/appointments/useCases/create-appointment";

const appointmentRoutes = Router();

appointmentRoutes.get(
  "/appointments/free",
  ensureAuthenticate,
  freeSchedulesController.handle
);

appointmentRoutes.post(
  "/appointments",
  ensureAuthenticate,
  createAppointmentController.handle
);

export { appointmentRoutes };
