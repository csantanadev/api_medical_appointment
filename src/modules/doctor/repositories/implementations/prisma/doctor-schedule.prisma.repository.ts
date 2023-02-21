import { DoctorSchedule } from '../../../entities/doctor-schedule.entity';
import { prismaClient } from "../../../../../infra/databases/prisma.config";
import { IDoctorScheduleRepository } from '../../doctor-schedule.repository';
import { DoctorScheduleMapper } from '../../../mapper/doctor-schedule.mapper';

export class DoctorSchedulePrismaRepository implements IDoctorScheduleRepository {
    

    async save(data: DoctorSchedule): Promise<void> {

        await prismaClient.$transaction([
            prismaClient.doctorSchedules.deleteMany({
                where: {
                    doctor_id : data.doctorId
                }
            }),
            
            prismaClient.doctorSchedules.createMany({
                data: DoctorScheduleMapper.entityDoctorScheduleToPrisma(data)
            })
        ]);
        
    }
    


}