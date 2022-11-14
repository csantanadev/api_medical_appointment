import { randomUUID } from 'crypto';
import { StatusCodes } from 'http-status-codes';
import { CustomError } from '../../../errors/custom.error';

type IUser = {
    name: string,
    username: string,
    password: string
}

export class User {

    readonly id: string
    name: string;
    username: string;
    password: string;
    isAdmin: boolean;

    private constructor(props: IUser) {
        this.name = props.name;
        this.username = props.username;
        this.password = props.password;
        this.id = randomUUID();
        this.isAdmin = false;
    }

    static create(props: IUser) {

        if (!props.username || !props.password) {
            throw new CustomError('Username / Password is required.', StatusCodes.UNPROCESSABLE_ENTITY, 'PARAMETER_REQUIRED');
        }

        const user = new User(props);
        return user;
    }


}