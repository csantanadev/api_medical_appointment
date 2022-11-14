import { Router } from "express";
import { ensureAadmin } from "../infra/shared/http/middleware/ensure-admin.middlware";
import { ensureAuthenticate } from "../infra/shared/http/middleware/ensure-authenticate.middleware";
import { createSpecialityController } from "../modules/speciality/useCases";


const specialityRoutes = Router();

specialityRoutes.post('/specialities', 
    ensureAuthenticate, 
    ensureAadmin,
    createSpecialityController.handle);

export { specialityRoutes }


