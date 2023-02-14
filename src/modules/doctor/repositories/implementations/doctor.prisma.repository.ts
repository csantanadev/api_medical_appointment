import { DoctorMapper } from './../../mapper/doctor.mapper';
import { prismaClient } from "../../../../infra/databases/prisma.config";
import { Doctor } from "../../entities/doctor.entity";
import { IDoctorRepository } from "../doctor.repository";

export class DoctorPrismaRepository implements IDoctorRepository {
    

    async save(data: Doctor): Promise<Doctor> {
        const doctor = await prismaClient.doctor.create({
            data: {
                crm: data.crm,
                email: data.email,
                speciality_id: data.specialityId,
                user_id : data.userId
            }
        });

        return DoctorMapper.PrismaToEntityDoctor(doctor);
    }
    
    async findByCRM(crm: string): Promise<Doctor | null> {

        const doctor = await prismaClient.doctor.findUnique({
            where: {
                crm
            }
        });

        if(doctor) return DoctorMapper.PrismaToEntityDoctor(doctor);

        return null;
    }

    async findById(id: string): Promise<Doctor | null> {

        const doctor = await prismaClient.doctor.findUnique({
            where: { id }
        });

        if(doctor) return DoctorMapper.PrismaToEntityDoctor(doctor);

        return null;
    }


    async findByUserId(userId: string): Promise<Doctor | null> {

        const doctor = await prismaClient.doctor.findUnique({
            where: {
                user_id : userId
            }
        });

        if(doctor) return DoctorMapper.PrismaToEntityDoctor(doctor);

        return null;
    }

}