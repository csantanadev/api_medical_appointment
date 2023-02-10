import { Doctor } from "../entities/doctor.entity";

export interface IDocotorRepository {
    
    save(data: Doctor): Promise<Doctor>
    findByCRM(crm: string): Promise<Doctor | null>

}