import { DoctorInfo } from './../../../entities/doctor-info.entity';
import { prismaClient } from "../../../../../infra/databases/prisma.config";
import { IDoctorInfoRepository } from '../../doctor-info.repository';
import { DoctorInfoMapper } from '../../../mapper/doctor-info.mapper';

export class DoctorInfoPrismaRepository implements IDoctorInfoRepository {
    async saveOrUpdate(data: DoctorInfo): Promise<DoctorInfo> {

        const doctorInfo = await prismaClient.doctorInfo.upsert({
            where: {
                doctor_id: data.doctorId
            },
            create: {
                duration: data.duration,
                price: data.price,
                doctor_id: data.doctorId
            },
            update: {
                duration: data.duration,
                price: data.price
            }
        });
        
        return DoctorInfoMapper.PrismaToEntityDoctorInfo(doctorInfo);
    }

    async findByDoctorId(doctorId: string): Promise<DoctorInfo | null> {
        
        const doctorInfo = await prismaClient.doctorInfo.findFirst({
            where: {
                doctor_id : doctorId
            }
        });

        return doctorInfo ? DoctorInfoMapper.PrismaToEntityDoctorInfo(doctorInfo) : null;
    }

}