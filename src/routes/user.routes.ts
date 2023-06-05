import { Router, response } from "express";
import { authenticateUserController } from "../modules/users/useCases/authenticate-user";
import { createUserController } from "../modules/users/useCases/create-user";
import { refreshTokenController } from "../modules/users/useCases/refresh-token";

const userRoutes = Router();

userRoutes.post("/users", createUserController.handle);

userRoutes.post("/login", authenticateUserController.handle);

userRoutes.post("/refresh-token", refreshTokenController.handle);

export { userRoutes };
