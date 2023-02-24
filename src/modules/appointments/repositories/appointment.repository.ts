export type AppointmentsDate = {
    date: Date
}

export interface IAppointmentRepository {
    findAllSchedulesByDoctorAndDate(doctorId: string, date: string): Promise<AppointmentsDate[]>
}