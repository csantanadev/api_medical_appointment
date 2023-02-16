import { UserMemoryRepository } from './../../../../users/repositories/implementations/user.memory.repository';
import { test, describe, expect, beforeAll } from "vitest"
import { randomUUID } from "crypto";
import { CreateAppointmentUseCase } from '../create-appointment.usecase';
import { PatientMemoryRespository } from '../../../../patient/repositories/implementations/in-memory/patient-memory.repository';
import { DoctorMemoryRespository } from '../../../../doctor/repositories/implementations/in-memory/doctor-memory.repository';

describe("Create appointment", () => {

    test("Should not be able to create a new appointment without a patient or with an invalid patient", async () => {
        const patientInMemoryRepository = new PatientMemoryRespository();
        const doctorInMemoryRespository = new DoctorMemoryRespository();
        const createAppointmentUseCase = new CreateAppointmentUseCase(patientInMemoryRepository, doctorInMemoryRespository);

        expect(async () => {
            await createAppointmentUseCase.execute({
                doctorId: randomUUID(),
                date: new Date()
            }, 'ID_USER_INVALID');
        }).rejects.toThrow('Patient does not exists.');
    });

    test("Should not be able to create a new appointment without a doctor or with an invalid doctor", async () => {
        const patientInMemoryRepository = new PatientMemoryRespository();
        const doctorInMemoryRespository = new DoctorMemoryRespository();
        const createAppointmentUseCase = new CreateAppointmentUseCase(patientInMemoryRepository, doctorInMemoryRespository);

        const patient = await patientInMemoryRepository.save({
            document: 'DOCUMENT_PATIENT',
            email: 'patient_test@email.com',
            id: randomUUID(),
            userId: randomUUID()
        });

        expect(async () => {
            await createAppointmentUseCase.execute({
                doctorId: randomUUID(),
                date: new Date()
            }, patient.userId);
        }).rejects.toThrow('Doctor does not exists.');
    });




});