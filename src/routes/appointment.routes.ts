import { Router } from "express";
import { ensureAuthenticate } from "../infra/shared/http/middleware/ensure-authenticate.middleware";
import { freeSchedulesController } from "../modules/appointments/useCases/free-schedules";


const appointmentRoutes = Router();

appointmentRoutes.get('/appointments/free',
    ensureAuthenticate,
    freeSchedulesController.handle);

export { appointmentRoutes }