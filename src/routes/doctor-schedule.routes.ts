import { Router } from "express";
import { ensureAuthenticate } from "../infra/shared/http/middleware/ensure-authenticate.middleware";
import { createDoctorScheduleController } from "../modules/doctor/useCases/create-doctor-schedule";

const doctorScheduleRoutes = Router();

doctorScheduleRoutes.post(
  "/doctor-schedule",
  ensureAuthenticate,
  createDoctorScheduleController.handle
);

export { doctorScheduleRoutes };
