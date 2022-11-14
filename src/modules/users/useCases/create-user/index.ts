import { CreateUserUseCase } from './create-user.usecase';
import { UserPrismaRepository } from './../../repositories/implementations/user.prisma.repository';
import { CreateUserController } from './create-user.controller';
import { PasswordBcrypt } from '../../../../infra/shared/crypto/password.bcrypt.impl';

const userPrismaRepository = new UserPrismaRepository();
const passwordBcrypt = new PasswordBcrypt();

const createUserUseCase = new CreateUserUseCase(userPrismaRepository, passwordBcrypt);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserController }