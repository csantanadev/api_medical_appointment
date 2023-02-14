import { Router } from "express"
import { doctorInfoRoutes } from "./doctor-info.routes";
import { doctorRoutes } from "./doctor.routes";
import { specialityRoutes } from "./speciality.routes";
import { userRoutes } from "./user.routes";

const routes = Router();

routes.use(userRoutes);
routes.use(specialityRoutes);
routes.use(doctorRoutes);
routes.use(doctorInfoRoutes);

export { routes }