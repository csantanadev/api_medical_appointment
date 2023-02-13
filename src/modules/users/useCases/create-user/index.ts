import { CreateUserUseCase } from './create-user.usecase';
import { UserPrismaRepository } from './../../repositories/implementations/user.prisma.repository';
import { CreateUserController } from './create-user.controller';


const userPrismaRepository = new UserPrismaRepository();
const createUserUseCase = new CreateUserUseCase(userPrismaRepository);
const createUserController = new CreateUserController(createUserUseCase);

export { createUserController }