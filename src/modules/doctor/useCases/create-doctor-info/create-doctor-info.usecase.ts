import { IDoctorInfoRepository } from './../../repositories/doctor-info.repository';
import { DoctorInfo } from './../../entities/doctor-info.entity';
import { StatusCodes } from "http-status-codes"
import { CustomError } from "../../../../errors/custom.error"
import { IDoctorRepository } from "../../repositories/doctor.repository"

export type DoctorInfoRequest = {
    startAt: string
    endAt: string
    price: number
    duration: number
}

export class CreateDoctorInfoUseCase {

    constructor(private doctorRepository: IDoctorRepository,
        private doctorInfoRepository: IDoctorInfoRepository) { }

    async execute(data: DoctorInfoRequest, userId: string) {

        const doctorByUserId = await this.doctorRepository.findByUserId(userId);

        if (!doctorByUserId) {
            throw new CustomError('Doctor does not exists!', StatusCodes.BAD_REQUEST);
        }

        const doctorInfo = DoctorInfo.create({ ...data, doctorId: doctorByUserId.id });

        const doctorInfoCreated = await this.doctorInfoRepository.save(doctorInfo);

        return doctorInfoCreated;
    }


}