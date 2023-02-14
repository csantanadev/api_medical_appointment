import { Router } from "express";
import { ensureAadmin } from "../infra/shared/http/middleware/ensure-admin.middlware";
import { ensureAuthenticate } from "../infra/shared/http/middleware/ensure-authenticate.middleware";
import { createDoctorController } from "../modules/doctor/useCases/create-doctor"; 


const doctorRoutes = Router();

doctorRoutes.post('/doctor', 
    ensureAuthenticate, 
    ensureAadmin,
    createDoctorController. handle);

export { doctorRoutes }