import { randomUUID } from 'crypto';
import { DoctorSchedule } from '../entities/doctor-schedule.entity';
import { DoctorSchedules as DoctorSchedulePrisma } from '@prisma/client';


export class DoctorScheduleMapper {

    static entityDoctorScheduleToPrisma(data: DoctorSchedule): DoctorSchedulePrisma[] {
        const doctorSchedulePrisma : DoctorSchedulePrisma[] = []
        
        data.schedules.forEach(schedule => {
            doctorSchedulePrisma.push({
                day_of_week: schedule.dayOfWeek,
                start_at: schedule.startAt,
                end_at: schedule.endAt,
                doctor_id: data.doctorId,
                id: schedule.id ?? randomUUID()
            })
        })

        return doctorSchedulePrisma;
    }

}
