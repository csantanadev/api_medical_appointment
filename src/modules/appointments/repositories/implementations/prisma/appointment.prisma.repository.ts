import { prismaClient } from "../../../../../infra/databases/prisma.config";
import { endOfDay, startOfDay, toDate } from "../../../../../utils/date";
import { Appointment } from "../../../entities/appointment.entity";
import {
  AppointmentsDate,
  AppointmentsWithPatient,
  IAppointmentRepository,
} from "../../appointment.repository";

export class AppointmentPrismaRepository implements IAppointmentRepository {
  async findAllSchedulesByDoctorAndDate(
    doctorId: string,
    date: string
  ): Promise<AppointmentsDate[]> {
    return await prismaClient.$queryRaw`
            select ap.date from appointments ap where to_char(ap.date, 'YYYY-MM-DD') = ${date} and 
            doctor_id = ${doctorId}
        `;

    /* .$queryRawUnsafe(` 
                SELECT to_char(ap.date, 'HH24:MI') as date from appointments ap 
                left join doctor_schedules ds on (ds.doctor_id = ap.doctor_id) 
                where ap.doctor_id = '${doctorId}' and to_char(ap.date, 'YYYY-MM-DD') = '${date}'
                and ds.day_of_week = extract(dow from date '${date}') 
        `);*/
    // queryRawUnsafe - faz com que o prisma consiga de alguma forma entender as funções nativas do BD
    // mas o normal é utilizar o queryRaw para os casos onde não se utiliza funcoes do proprio BD.
  }

  async findAppointmentByDoctorAndDatetime(
    doctorId: string,
    date: string
  ): Promise<AppointmentsDate | null> {
    const result: AppointmentsDate[] = await prismaClient.$queryRaw`
            select ap.date from appointments ap where to_char(ap.date, 'YYYY-MM-DD HH24:MI') = ${date} and 
            doctor_id = ${doctorId} limit 1
        `;

    return result[0];
  }
  async findAppointmentByPatientAndDatetime(
    patientId: string,
    date: string
  ): Promise<AppointmentsDate | null> {
    const result: AppointmentsDate[] = await prismaClient.$queryRaw`
    select ap.date from appointments ap where to_char(ap.date, 'YYYY-MM-DD HH24:MI') = ${date} and 
    patient_id = ${patientId} limit 1`;
    return result[0];
  }

  async save(data: Appointment): Promise<void> {
    await prismaClient.appointment.create({
      data: {
        date: toDate(data.date),
        doctor_id: data.doctorId,
        patient_id: data.patientId,
        id: data.id,
      },
    });
  }

  async findAllTodayIncludePatients(): Promise<AppointmentsWithPatient[]> {

    //console.log(startOfDay())
    //console.log(endOfDay())

    const result = await prismaClient.appointment.findMany({
      /*where: {
        date: {
          gte: startOfDay(),
          lte: endOfDay(),
        },
      },*/
      include: {
        patient: true,
      },
    });

    return result;
  }
}
