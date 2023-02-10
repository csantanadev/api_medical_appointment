import { Doctor } from '../../entities/doctor.entity';
import { IDocotorRepository } from './../doctor.repository';

export class DoctorMemoryRespository implements IDocotorRepository {
    
    items: Doctor[] = [];

    async save(data: Doctor): Promise<Doctor> {
        this.items.push(data);
        return data;
    }

    async findByCRM(crm: string): Promise<Doctor | null> {
        return this.items.find(doctor => doctor.crm === crm) || null;
    }


}