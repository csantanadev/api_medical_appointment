import { UserMemoryRepository } from './../../../../users/repositories/implementations/user.memory.repository';
import { CreateDoctorUseCase } from './../create-doctor.usecase';
import { test, describe, expect  } from "vitest"
import { randomUUID } from "crypto";
import { CreateDoctorRequest } from "../create-doctor.usecase";
import { DoctorMemoryRespository } from '../../../repositories/implementations/doctor-memory.repository';

describe("Create doctor use case", ()=> {

    test("Should be able to create a new doctor", async ()=> {

        const doctorMock : CreateDoctorRequest = {
            username: 'username_test',
            name: 'name_test',
            password: 'password_test',
            email: 'email@email.com.br',
            crm: '123456',
            specialityId: randomUUID()
        }

        const userRepository = UserMemoryRepository.getInstance();
        const doctorRepository =  new DoctorMemoryRespository();


        const createDoctorUseCase = new CreateDoctorUseCase(userRepository, doctorRepository);
        const doctorCreated = await createDoctorUseCase.execute(doctorMock);

        expect(doctorCreated).toHaveProperty('id');
    });

    test("Should not be able to create a new doctor with exists CRM", async ()=> {

        const doctorMock : CreateDoctorRequest = {
            username: 'username_crm',
            name: 'name_test',
            password: 'password_test',
            email: 'email@email.com.br',
            crm: '123456',
            specialityId: randomUUID()
        }

        const doctorMockDuplicated : CreateDoctorRequest = {
            username: 'username_duplicated',
            name: 'name_test',
            password: 'password_test',
            email: 'duplicated@email.com.br',
            crm: '123456',
            specialityId: randomUUID()
        }

        const userRepository = UserMemoryRepository.getInstance();
        const doctorRepository =  new DoctorMemoryRespository();
        
        const createDoctorUseCase = new CreateDoctorUseCase(userRepository, doctorRepository);

        await createDoctorUseCase.execute(doctorMock);

        expect(async ()=> {
            await createDoctorUseCase.execute(doctorMockDuplicated);
        }).rejects.toThrow();
    });

    test("Should not be able to create a new doctor with exists CRM length invalid", async ()=> {

        const doctorMock : CreateDoctorRequest = {
            username: 'username_crm_length',
            name: 'name_test',
            password: 'password_test',
            email: 'email@email.com.br',
            crm: '12345',
            specialityId: randomUUID()
        }
       
        const userRepository = UserMemoryRepository.getInstance();
        const doctorRepository =  new DoctorMemoryRespository();
        
        const createDoctorUseCase = new CreateDoctorUseCase(userRepository, doctorRepository);

        expect(async ()=> {
            await createDoctorUseCase.execute(doctorMock);
        }).rejects.toThrow('CRM length is incorrect.');
    });


});