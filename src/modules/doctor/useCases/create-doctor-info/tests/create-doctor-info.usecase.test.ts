import { test, describe, expect, beforeAll } from "vitest";
import dayjs from "dayjs";
import { randomUUID } from "crypto";
import {
  CreateDoctorInfoUseCase,
  DoctorInfoRequest,
} from "../create-doctor-info.usecase";
import { DoctorMemoryRespository } from "../../../repositories/implementations/in-memory/doctor-memory.repository";
import { DoctorInfoMemoryRespository } from "../../../repositories/implementations/in-memory/doctor-info-memory.repository";

describe("Create Doctor Info", () => {
  test("Should not be able to create a doctor info if doctor does not exists", async () => {
    const doctorMemoryRepository = new DoctorMemoryRespository();
    const doctorInfoMemoryRepository = new DoctorInfoMemoryRespository();
    const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(
      doctorMemoryRepository,
      doctorInfoMemoryRepository
    );

    const doctorInfo: DoctorInfoRequest = {
      startAt: dayjs().startOf("day").add(10, "hour").format("HH:mm"), // inicia as 10:00
      endAt: dayjs().startOf("day").add(18, "hour").format("HH:mm"), // termina as 18:00
      price: 150,
      duration: 10,
    };

    expect(async () => {
      await createDoctorInfoUseCase.execute(doctorInfo, "INVALID");
    }).rejects.toThrow("Doctor does not exists!"); // utiliza-se o rejects quando o trecho de código retorna uma promise,
    // em caso contrário basta colocar o toThrow.
  });

  test("Should not be able to create a doctor info if endAt is before startAt", async () => {
    const doctorMemoryRepository = new DoctorMemoryRespository();
    const doctorInfoMemoryRepository = new DoctorInfoMemoryRespository();
    const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(
      doctorMemoryRepository,
      doctorInfoMemoryRepository
    );

    const userId = randomUUID();

    await doctorMemoryRepository.save({
      crm: "123456",
      email: "doctor@test.com.br",
      id: randomUUID(),
      specialityId: randomUUID(),
      userId,
    });

    const doctorInfo: DoctorInfoRequest = {
      startAt: dayjs().startOf("day").add(18, "hour").format("HH:mm"), // inicia as 18:00
      endAt: dayjs().startOf("day").add(10, "hour").format("HH:mm"), // termina as 10:00 (inicio maior que o final)
      price: 150,
      duration: 10,
    };
    expect(async () => {
      await createDoctorInfoUseCase.execute(doctorInfo, userId);
    }).rejects.toThrow("End time cannot be earlier than start time.");
  });

  test("Should not be able to create a doctor info if StartAt is invalid", async () => {
    const doctorMemoryRepository = new DoctorMemoryRespository();
    const doctorInfoMemoryRepository = new DoctorInfoMemoryRespository();
    const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(
      doctorMemoryRepository,
      doctorInfoMemoryRepository
    );

    const userId = randomUUID();

    await doctorMemoryRepository.save({
      crm: "123456",
      email: "doctor@test.com.br",
      id: randomUUID(),
      specialityId: randomUUID(),
      userId,
    });

    const doctorInfo: DoctorInfoRequest = {
      startAt: "99:99",
      endAt: dayjs().startOf("day").add(18, "hour").format("HH:mm"),
      price: 150,
      duration: 10,
    };
    expect(async () => {
      await createDoctorInfoUseCase.execute(doctorInfo, userId);
    }).rejects.toThrow("Invalid StartAt.");
  });

  test("Should not be able to create a doctor info if EndAt is invalid", async () => {
    const doctorMemoryRepository = new DoctorMemoryRespository();
    const doctorInfoMemoryRepository = new DoctorInfoMemoryRespository();
    const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(
      doctorMemoryRepository,
      doctorInfoMemoryRepository
    );

    const userId = randomUUID();

    await doctorMemoryRepository.save({
      crm: "123456",
      email: "doctor@test.com.br",
      id: randomUUID(),
      specialityId: randomUUID(),
      userId,
    });

    const doctorInfo: DoctorInfoRequest = {
      startAt: dayjs().startOf("day").add(18, "hour").format("HH:mm"),
      endAt: "99:99",
      price: 150,
      duration: 10,
    };
    expect(async () => {
      await createDoctorInfoUseCase.execute(doctorInfo, userId);
    }).rejects.toThrow("Invalid EndAt.");
  });

  test("Should be able to create a new doctor info", async () => {
    const doctorMemoryRepository = new DoctorMemoryRespository();
    const doctorInfoMemoryRepository = new DoctorInfoMemoryRespository();
    const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(
      doctorMemoryRepository,
      doctorInfoMemoryRepository
    );

    const userId = randomUUID();

    await doctorMemoryRepository.save({
      crm: "123456",
      email: "doctor@test.com.br",
      id: randomUUID(),
      specialityId: randomUUID(),
      userId,
    });

    const doctorInfo: DoctorInfoRequest = {
      startAt: dayjs().startOf("day").add(10, "hour").format("HH:mm"),
      endAt: dayjs().startOf("day").add(18, "hour").format("HH:mm"),
      price: 150,
      duration: 10,
    };

    const doctorInfoCreated = await createDoctorInfoUseCase.execute(
      doctorInfo,
      userId
    );

    expect(doctorInfoCreated).toHaveProperty("id");
  });

  test("Should be able to update a exist doctor info", async () => {
    const doctorMemoryRepository = new DoctorMemoryRespository();
    const doctorInfoMemoryRepository = new DoctorInfoMemoryRespository();
    const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(
      doctorMemoryRepository,
      doctorInfoMemoryRepository
    );

    const userId = randomUUID();

    await doctorMemoryRepository.save({
      crm: "123456",
      email: "doctor@test.com.br",
      id: randomUUID(),
      specialityId: randomUUID(),
      userId,
    });

    const doctorInfo: DoctorInfoRequest = {
      startAt: dayjs().startOf("day").add(10, "hour").format("HH:mm"),
      endAt: dayjs().startOf("day").add(18, "hour").format("HH:mm"),
      price: 150,
      duration: 10,
    };

    // tentando salvar duas vezes
    const doctorInfoCreated = await createDoctorInfoUseCase.execute(
      doctorInfo,
      userId
    );
    const doctorInfoUpdated = await createDoctorInfoUseCase.execute(
      doctorInfo,
      userId
    );

    expect(doctorInfoCreated).toHaveProperty("id");
    // testando se o id não mudou
    expect(doctorInfoCreated.id).toBe(doctorInfoUpdated.id);
  });
});
