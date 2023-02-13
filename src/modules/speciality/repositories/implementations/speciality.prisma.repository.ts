import { prismaClient } from '../../../../infra/databases/prisma.config';
import { Speciality } from '../../entities/speciality.entity';
import { ISpecialityRepository } from '../speciality.repository';


export class SpecialityPrismaRepository implements ISpecialityRepository {

    async findbyName(name: string): Promise<Speciality | null> {

        return await prismaClient.speciality.findUnique({
            where: {
                name
            }
        });
    }

    async save(data: Speciality): Promise<Speciality> {

        const speciality = await prismaClient.speciality.create({ data });
        return speciality;

    }

    async findById(id: string): Promise<Speciality | null> {

        return await prismaClient.speciality.findUnique({
            where: {
                id
            }
        });
    }


}

