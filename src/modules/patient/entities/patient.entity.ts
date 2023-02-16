import { StatusCodes } from 'http-status-codes';
import { randomUUID } from 'crypto';
import { CustomError } from '../../../errors/custom.error';

export type PatientProps = {
    document: string
    email: string;
    userId: string;
}

export class Patient {
    readonly id: string;
    document: string
    email: string;
    userId: string;

    private constructor(props: PatientProps) {
        this.document = props.document;
        this.email = props.email;
        this.userId = props.userId;
        this.id = randomUUID();
    }

    static create(props: PatientProps) {

        if (!props.document) {
            throw new CustomError('Document is required.', StatusCodes.UNPROCESSABLE_ENTITY, 'PARAMETER_REQUIRED');
        }
        if (props.document.length <= 5) {
            throw new CustomError('Document length is incorrect.', StatusCodes.UNPROCESSABLE_ENTITY, 'PARAMETER_REQUIRED');
        }
        if (!props.email) {
            throw new CustomError('Email name is required.', StatusCodes.UNPROCESSABLE_ENTITY, 'PARAMETER_REQUIRED');
        }

        const patient = new Patient(props);
        return patient;
    }

}