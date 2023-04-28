import { Router } from "express";
import { createDoctorController } from "../modules/doctor/useCases/create-doctor";

const doctorRoutes = Router();

doctorRoutes.post("/doctor", createDoctorController.handle);

export { doctorRoutes };
