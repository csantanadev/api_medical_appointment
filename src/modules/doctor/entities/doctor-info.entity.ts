import { StatusCodes } from 'http-status-codes';
import { randomUUID } from 'crypto';
import { CustomError } from '../../../errors/custom.error';
import { compareEndTimeIsAfter, validateTime } from '../../../utils/date';

export type DoctorInfoProps = {
    duration: number
    price: number
    startAt: string
    endAt: string
    doctorId: string
}

export class DoctorInfo {

    readonly id: string;
    duration: number;
    price: number;
    startAt: string;
    endAt: string;
    doctorId: string

    private constructor(props: DoctorInfoProps) {

        this.duration = props.duration;
        this.price = props.price;
        this.startAt = props.startAt;
        this.endAt = props.endAt;
        this.doctorId = props.doctorId;
        this.id = randomUUID();

    }

    static create(props: DoctorInfoProps) {

        if (!props.doctorId) {
            throw new CustomError('Doctor does not exists.', StatusCodes.UNPROCESSABLE_ENTITY, 'PARAMETER_REQUIRED');
        }
        if (props.duration <= 0) {
            throw new CustomError('Invalid duration.', StatusCodes.UNPROCESSABLE_ENTITY, 'PARAMETER_REQUIRED');
        }
        if (!validateTime(props.startAt)) {
            throw new CustomError('Invalid StartAt.', StatusCodes.UNPROCESSABLE_ENTITY, 'PARAMETER_REQUIRED');
        }
        if (!validateTime(props.endAt)) {
            throw new CustomError('Invalid EndAt.', StatusCodes.UNPROCESSABLE_ENTITY, 'PARAMETER_REQUIRED');
        }
        if (!compareEndTimeIsAfter(props.startAt, props.endAt)) {
            throw new CustomError('End time cannot be earlier than start time.', StatusCodes.UNPROCESSABLE_ENTITY, 'PARAMETER_REQUIRED');
        }

        const doctorInfo = new DoctorInfo(props);
        return doctorInfo;
    }


}