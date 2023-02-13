import { StatusCodes } from "http-status-codes";
import { CustomError } from "../../../../errors/custom.error";
import { ISpecialityRepository } from "../../../speciality/repositories/speciality.repository";
import { User } from "../../../users/entities/user.entity";
import { IUserRepository } from "../../../users/repositories/user.repository";
import { Doctor } from "../../entities/doctor.entity"
import { IDoctorRepository } from "../../repositories/doctor.repository";

export type CreateDoctorRequest = {
    username: string,
    name: string, 
    password: string,
    email: string,
    crm: string,
    specialityId: string
}


export class CreateDoctorUseCase {

    constructor(
        private userRepository: IUserRepository, 
        private doctorRepository: IDoctorRepository,
        private specialityRepository: ISpecialityRepository) {}

    async execute(data: CreateDoctorRequest) {

        const speciality = await this.specialityRepository.findById(data.specialityId);

        if(!speciality) {
            throw new  CustomError('Speciality does not exists.', StatusCodes.BAD_REQUEST);
        }

        const existsUser = await this.userRepository.findByUserName(data.username);

        if(existsUser) {
            throw new  CustomError('Username already exists.', StatusCodes.BAD_REQUEST, 'USER_EXISTS');
        }

        const user = User.create({name: data.name, password: data.password, username: data.username});

        const userCreated = await this.userRepository.save(user);

        const doctor = Doctor.create({crm: data.crm, email: data.email, specialityId: data.specialityId, 
            userId : userCreated.id
        });

        const crmExists = await this.doctorRepository.findByCRM(data.crm);

        if(crmExists) {
            throw new CustomError('CRM already exists.', StatusCodes.BAD_REQUEST);   
        }

        const doctorCreated = await this.doctorRepository.save(doctor);

        return doctorCreated;

    }


}