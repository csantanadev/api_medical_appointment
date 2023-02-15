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
                start_at: data.startAt,
                end_at: data.endAt,
                duration: data.duration,
                price: data.price,
                doctor_id: data.doctorId
            },
            update: {
                start_at: data.startAt,
                end_at: data.endAt,
                duration: data.duration,
                price: data.price
            }
        });
        
        return DoctorInfoMapper.PrismaToEntityDoctorInfo(doctorInfo);
    }

}