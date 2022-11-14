import { Speciality } from './../entities/speciality.entity';

export interface ICreateSpecalityRepository {

    findbyName(name: string): Promise<Speciality | undefined>
    
    save(data: Speciality): Promise<Speciality>
    
}