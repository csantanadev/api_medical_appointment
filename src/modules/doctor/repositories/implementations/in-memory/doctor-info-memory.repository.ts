import { DoctorInfo } from "./../../../entities/doctor-info.entity";
import { IDoctorInfoRepository } from "./../../doctor-info.repository";

export class DoctorInfoMemoryRespository implements IDoctorInfoRepository {
  items: DoctorInfo[] = [];

  async saveOrUpdate(data: DoctorInfo): Promise<DoctorInfo> {
    const index = this.items.findIndex((d) => d.doctorId === data.doctorId);

    if (index >= 0) {
      const doctor = this.items[index];
      this.items[index] = {
        ...doctor,
        duration: data.duration,
        price: data.price,
      };
      data = this.items[index];
    } else {
      this.items.push(data);
    }
    return data;
  }

  async findByDoctorId(doctorId: string): Promise<DoctorInfo | null> {
    throw new Error("Method not implemented.");
  }
}
