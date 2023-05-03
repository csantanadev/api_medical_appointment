import { Router } from "express";
import { createPatientController } from "../modules/patient/useCases/create-patient";
import multer from "multer";

import uploadConfig from "../config/upload.config";

const upload = multer(uploadConfig);

const patientRoutes = Router();

patientRoutes.post(
  "/patient",
  upload.single("avatar"),
  createPatientController.handle
);

export { patientRoutes };
