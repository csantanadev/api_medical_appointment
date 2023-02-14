import { DoctorInfo } from './../../../entities/doctor-info.entity';
import { prismaClient } from "../../../../../infra/databases/prisma.config";
import { IDoctorInfoRepository } from '../../doctor-info.repository';
import { DoctorInfoMapper } from '../../../mapper/doctor-info.mapper';

export class DoctorInfoPrismaRepository implements IDoctorInfoRepository {

    async save(data: DoctorInfo): Promise<DoctorInfo> {
        const doctorInfo = await prismaClient.doctorInfo.create({
            data: {
                start_at: data.startAt,
                end_at: data.endAt,
                duration: data.duration,
                price: data.price,
                doctor_id: data.doctorId
            }
        });

        return DoctorInfoMapper.PrismaToEntityDoctorInfo(doctorInfo);
        
    }
    
    

}