import { StatusCodes } from "http-status-codes";
import { CustomError } from "../../../../errors/custom.error";
import { User } from "../../../users/entities/user.entity";
import { IUserRepository } from "../../../users/repositories/user.repository";
import { Patient } from "../../entities/patient.entity";
import { IPatientRepository } from "../../repositories/patient.repository";

export type CreatePatientRequest = {
    username: string,
    password: string,
    email: string,
    name: string,
    document: string
}


export class CreatePatientUseCase {

    constructor(
        private userRepository: IUserRepository,
        private patientRepository: IPatientRepository) { }

    async execute(data: CreatePatientRequest) {

        // create a object
        const user = await User.create({ name: data.name, password: data.password, username: data.username });

        const existsUser = await this.userRepository.findByUserName(data.username);

        if (existsUser) {
            throw new CustomError('Username already exists.', StatusCodes.BAD_REQUEST, 'USER_EXISTS');
        }

        const patientExists = await this.patientRepository.findByDocumentOrEmail(data.document, data.email);

        if (patientExists) {
            throw new CustomError('Patient already exists.', StatusCodes.BAD_REQUEST);
        }

        // salva o usuario no bd
        const userCreated = await this.userRepository.save(user);

        // create a object
        const patient = Patient.create({ document: data.document, email: data.email, userId: userCreated.id });

        // salva o paciente no bd
        const patientCreated = await this.patientRepository.save(patient);

        return patientCreated;
    }


}