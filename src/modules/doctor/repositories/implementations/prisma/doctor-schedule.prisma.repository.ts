import { DoctorSchedule } from '../../../entities/doctor-schedule.entity';
import { prismaClient } from "../../../../../infra/databases/prisma.config";
import { IDoctorScheduleRepository } from '../../doctor-schedule.repository';
import { DoctorScheduleMapper, DoctorScheduleWeek } from '../../../mapper/doctor-schedule.mapper';

export class DoctorSchedulePrismaRepository implements IDoctorScheduleRepository {

    async save(data: DoctorSchedule): Promise<void> {

        await prismaClient.$transaction([
            prismaClient.doctorSchedules.deleteMany({
                where: {
                    doctor_id: data.doctorId
                }
            }),

            prismaClient.doctorSchedules.createMany({
                data: DoctorScheduleMapper.entityToPrisma(data)
            })
        ]);
    }


    async findByDoctorIdAndDayOfWeek(doctorId: string, dayOfWeek: number): Promise<DoctorScheduleWeek | null> {
        const result = await prismaClient.doctorSchedules.findFirst({
            where: {
                day_of_week: dayOfWeek,
                AND: {
                    doctor_id: doctorId
                }
            },
            include: {
                doctor: {
                    include: {
                        doctorInfo: true
                    }
                }
            }
        });

        return result ? DoctorScheduleMapper.prismaToEntity(result) : null;
    }



}