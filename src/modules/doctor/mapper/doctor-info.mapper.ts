import { DoctorInfo } from './../entities/doctor-info.entity';
import { DoctorInfo as DoctorInfoPrisma } from '@prisma/client';


export class DoctorInfoMapper {

    static PrismaToEntityDoctorInfo(data: DoctorInfoPrisma): DoctorInfo {
        return {
            id: data.id,
            startAt: data.start_at,
            endAt: data.end_at,
            duration: data.duration,
            price: Number(data.price),
            doctorId: data.doctor_id
        }
    }

}
