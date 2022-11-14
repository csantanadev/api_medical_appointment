import { prismaClient } from '../../../../infra/databases/prisma.config';
import { Speciality } from '../../entities/speciality.entity';
import { ICreateSpecalityRepository } from './../create-speciality.repository';


export class CreateSpecialityPrismaRepository implements ICreateSpecalityRepository {

    async findbyName(name: string): Promise<Speciality | undefined> {

        const speciality = await prismaClient.speciality.findUnique({
            where: {
                name
            }
        });

        return speciality || undefined;
    }

    async save(data: Speciality): Promise<Speciality> {

        const speciality = await prismaClient.speciality.create({ data });
        return speciality;

    }

}

