import { DoctorWithUserDTO } from "../../../dto/doctor.dto";
import { Doctor } from "../../../entities/doctor.entity";
import { IDoctorRepository } from "../../doctor.repository";

export class DoctorMemoryRespository implements IDoctorRepository {
  items: Doctor[] = [];

  async save(data: Doctor): Promise<Doctor> {
    this.items.push(data);
    return data;
  }

  async findByCRM(crm: string): Promise<Doctor | null> {
    return this.items.find((doctor) => doctor.crm === crm) || null;
  }

  async findByUserId(userId: string): Promise<Doctor | null> {
    return this.items.find((doctor) => doctor.userId === userId) || null;
  }

  async findById(id: string): Promise<DoctorWithUserDTO | null> {
    //return this.items.find((doctor) => doctor.id === id) || null;
    return {
      id: "",
      crm: "",
      email: "",
      specialityId: "",
      userId: "",
      user: {
        name: "",
      },
    };
  }
}
