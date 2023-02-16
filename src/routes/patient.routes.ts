import { Router } from "express";
import { createPatientController } from "../modules/patient/useCases/create-patient";

const patientRoutes = Router();

patientRoutes.post('/patient', createPatientController.handle);

export { patientRoutes }