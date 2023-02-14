import { Router } from "express";
import { ensureAadmin } from "../infra/shared/http/middleware/ensure-admin.middlware";
import { ensureAuthenticate } from "../infra/shared/http/middleware/ensure-authenticate.middleware";
import { createDoctorInfoController } from "../modules/doctor/useCases/create-doctor-info";

const doctorInfoRoutes = Router();

doctorInfoRoutes.post('/doctor-info', 
    ensureAuthenticate, 
    createDoctorInfoController.handle);

export { doctorInfoRoutes }