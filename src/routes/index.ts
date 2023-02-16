import { Router } from "express"
import { doctorInfoRoutes } from "./doctor-info.routes";
import { doctorScheduleRoutes } from "./doctor-schedule.routes";
import { doctorRoutes } from "./doctor.routes";
import { patientRoutes } from "./patient.routes";
import { specialityRoutes } from "./speciality.routes";
import { userRoutes } from "./user.routes";

const routes = Router();

routes.use(userRoutes);
routes.use(specialityRoutes);
routes.use(doctorRoutes);
routes.use(doctorInfoRoutes);
routes.use(patientRoutes);
routes.use(doctorScheduleRoutes);

export { routes }