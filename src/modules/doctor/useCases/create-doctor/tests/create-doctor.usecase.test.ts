import { ISpecialityRepository } from "./../../../../speciality/repositories/speciality.repository";
import { Speciality } from "./../../../../speciality/entities/speciality.entity";
import { UserMemoryRepository } from "./../../../../users/repositories/implementations/user.memory.repository";
import { CreateDoctorUseCase } from "./../create-doctor.usecase";
import { test, describe, expect, beforeAll } from "vitest";
import { CreateDoctorRequest } from "../create-doctor.usecase";
import { DoctorMemoryRespository } from "../../../repositories/implementations/in-memory/doctor-memory.repository";
import { SpecialityMemoryRepository } from "../../../../speciality/repositories/implementations/speciality-memory.repository";

let specialityRepository: ISpecialityRepository;
let speciality: Speciality;

beforeAll(async () => {
  specialityRepository = new SpecialityMemoryRepository();
  speciality = Speciality.create({
    description: "DESC_TEST",
    name: "NAME_TEST",
  });
  await specialityRepository.save(speciality);
});

describe("Create doctor use case", () => {
  test("Should be able to create a new doctor", async () => {
    const userRepository = UserMemoryRepository.getInstance();
    const doctorRepository = new DoctorMemoryRespository();

    const doctorMock: CreateDoctorRequest = {
      username: "username_test",
      name: "name_test",
      password: "password_test",
      email: "email@email.com.br",
      crm: "123456",
      specialityId: speciality.id,
    };

    const createDoctorUseCase = new CreateDoctorUseCase(
      userRepository,
      doctorRepository,
      specialityRepository
    );
    const doctorCreated = await createDoctorUseCase.execute(doctorMock);

    expect(doctorCreated).toHaveProperty("id");
  });

  test("Should not be able to create a new doctor with exists CRM", async () => {
    const userRepository = UserMemoryRepository.getInstance();
    const doctorRepository = new DoctorMemoryRespository();

    const doctorMock: CreateDoctorRequest = {
      username: "username_crm",
      name: "name_test",
      password: "password_test",
      email: "email@email.com.br",
      crm: "123456",
      specialityId: speciality.id,
    };

    const doctorMockDuplicated: CreateDoctorRequest = {
      username: "username_duplicated",
      name: "name_test",
      password: "password_test",
      email: "duplicated@email.com.br",
      crm: "123456",
      specialityId: speciality.id,
    };

    const createDoctorUseCase = new CreateDoctorUseCase(
      userRepository,
      doctorRepository,
      specialityRepository
    );

    await createDoctorUseCase.execute(doctorMock);

    expect(async () => {
      await createDoctorUseCase.execute(doctorMockDuplicated);
    }).rejects.toThrow();
  });

  test("Should not be able to create a new doctor with exists CRM length invalid", async () => {
    const userRepository = UserMemoryRepository.getInstance();
    const doctorRepository = new DoctorMemoryRespository();

    const doctorMock: CreateDoctorRequest = {
      username: "username_crm_length",
      name: "name_test",
      password: "password_test",
      email: "email@email.com.br",
      crm: "12345",
      specialityId: speciality.id,
    };

    const createDoctorUseCase = new CreateDoctorUseCase(
      userRepository,
      doctorRepository,
      specialityRepository
    );

    expect(async () => {
      await createDoctorUseCase.execute(doctorMock);
    }).rejects.toThrow("CRM length is incorrect.");
  });
});
