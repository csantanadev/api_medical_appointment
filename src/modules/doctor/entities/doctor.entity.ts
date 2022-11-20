import { StatusCodes } from 'http-status-codes';
import { randomUUID } from 'crypto';
import { CustomError } from '../../../errors/custom.error';

export type DoctorProps = {
    crm: string;
    email: string;
    userId: string;
    specialityId: string;
}

export class Doctor {

    readonly id: string;
    crm: string;
    email: string;
    userId: string;
    specialityId: string;

    private constructor(props: DoctorProps) {
        this.crm = props.crm;
        this.email = props.email;
        this.userId = props.userId;
        this.specialityId = props.specialityId;
        this.id = randomUUID();
    }

    static create(props: DoctorProps) {

        if (!props.crm) {
            throw new CustomError('CRM name is required.', StatusCodes.UNPROCESSABLE_ENTITY, 'PARAMETER_REQUIRED');
        }
        if (props.crm.length !== 6) {
            throw new CustomError('CRM length is incorrect.', StatusCodes.UNPROCESSABLE_ENTITY, 'PARAMETER_REQUIRED');
        }
        if (!props.email) {
            throw new CustomError('Email name is required.', StatusCodes.UNPROCESSABLE_ENTITY, 'PARAMETER_REQUIRED');
        }

        const doctor = new Doctor(props);
        return doctor;
    }

}