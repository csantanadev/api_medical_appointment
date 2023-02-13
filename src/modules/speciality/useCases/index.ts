import { CreateSpecialityController } from './create-speciality.controller';
import { SpecialityPrismaRepository } from '../repositories/implementations/speciality.prisma.repository';
import { CreateSpecialityUseCase } from './create-speciality.usecase';


const specialityPrismaRepository = new SpecialityPrismaRepository();

const createSpecialityUseCase = new CreateSpecialityUseCase(specialityPrismaRepository);

const createSpecialityController = new CreateSpecialityController(createSpecialityUseCase);

export { createSpecialityController }