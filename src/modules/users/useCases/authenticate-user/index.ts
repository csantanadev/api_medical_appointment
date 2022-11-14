import { PasswordBcrypt } from "../../../../infra/shared/crypto/password.bcrypt.impl";
import { JWTToken } from "../../../../infra/shared/token/jwt.token";
import { UserPrismaRepository } from "../../repositories/implementations/user.prisma.repository";
import { AuthenticateUserController } from "./authenticate-user.controller";
import { AuthenticateUserUseCase } from "./authenticate-user.usecase";


const userPrismaRepository = new UserPrismaRepository();
const passwordBcrypt = new PasswordBcrypt();
const jwtToken = new JWTToken();


const authenticateUserUseCase = new AuthenticateUserUseCase(userPrismaRepository, passwordBcrypt, jwtToken);

const authenticateUserController = new AuthenticateUserController(authenticateUserUseCase);

export { authenticateUserController }