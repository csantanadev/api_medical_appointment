import { Patient } from "./../../../entities/patient.entity";
import { IPatientRepository } from "./../../patient.repository";

export class PatientMemoryRespository implements IPatientRepository {
  items: Patient[] = [];

  async save(data: Patient): Promise<Patient> {
    this.items.push(data);
    return data;
  }

  async findByDocument(document: string): Promise<Patient | null> {
    return this.items.find((patient) => patient.document === document) || null;
  }

  async findByUserId(userId: string): Promise<Patient | null> {
    return this.items.find((patient) => patient.userId === userId) || null;
  }

  async findById(id: string): Promise<Patient | null> {
    return this.items.find((patient) => patient.id === id) || null;
  }

  async findByDocumentOrEmail(
    document: string,
    email: string
  ): Promise<Patient | null> {
    throw new Error("Method not implemented.");
  }
}
