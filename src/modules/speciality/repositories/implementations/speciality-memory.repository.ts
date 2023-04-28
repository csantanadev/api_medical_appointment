import { Speciality } from "../../entities/speciality.entity";
import { ISpecialityRepository } from "../speciality.repository";

export class SpecialityMemoryRepository implements ISpecialityRepository {
  speciality: Speciality[] = [];

  async findbyName(name: string): Promise<Speciality | null> {
    return this.speciality.find((s) => s.name === name) || null;
  }

  async findById(id: string): Promise<Speciality | null> {
    return this.speciality.find((s) => s.id === id) || null;
  }

  async save(data: Speciality): Promise<Speciality> {
    this.speciality.push(data);
    return data;
  }
}
