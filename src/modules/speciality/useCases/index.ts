import { CreateSpecialityController } from './create-speciality.controller';
import { CreateSpecialityPrismaRepository } from './../repositories/implementations/create-speciality.prisma.repository';
import { CreateSpecialityUseCase } from './create-speciality.usecase';


const specialityPrismaRepository = new CreateSpecialityPrismaRepository();

const createSpecialityUseCase = new CreateSpecialityUseCase(specialityPrismaRepository);

const createSpecialityController = new CreateSpecialityController(createSpecialityUseCase);

export { createSpecialityController }