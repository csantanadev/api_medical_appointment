import { Router } from "express";
import { authenticateUserController } from "../modules/users/useCases/authenticate-user";
import { createUserController } from "../modules/users/useCases/create-user";


const userRoutes = Router();

userRoutes.post('/users', createUserController.handle);

userRoutes.post('/login', authenticateUserController.handle);


export { userRoutes }