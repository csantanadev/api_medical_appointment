import { StatusCodes } from 'http-status-codes';
import { IUserRepository } from './../../repositories/user.repository';
import { User } from "../../entities/user.entity";
import { CustomError } from '../../../../errors/custom.error';

type UserRequest = {
    name: string,
    username: string,
    password: string
}

export class CreateUserUseCase {

    constructor(private readonly userRepository: IUserRepository) { }

    async execute(data: UserRequest) {

        const user = await User.create(data);

        const userExists = await this.userRepository.findByUserName(data.username);
        
        if (userExists) {
            throw new CustomError('Username already exists.', StatusCodes.BAD_REQUEST, 'USER_EXISTS');
        }

        const userCreated = await this.userRepository.save(user);

        return userCreated;
    }


}