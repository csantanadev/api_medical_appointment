import { Speciality } from '../entities/speciality.entity';

export interface ISpecialityRepository {

    findbyName(name: string): Promise<Speciality | null>    
    save(data: Speciality): Promise<Speciality>
    findById(id: string): Promise<Speciality | null>    
    
}