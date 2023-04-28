import { StatusCodes } from "http-status-codes";
import { ISpecialityRepository } from "../repositories/speciality.repository";
import { Speciality } from "../entities/speciality.entity";
import { CustomError } from "../../../errors/custom.error";

type SpecialityRequest = {
  name: string;
  description: string;
};

export class CreateSpecialityUseCase {
  constructor(private readonly specialityRepository: ISpecialityRepository) {}

  async execute(data: SpecialityRequest) {
    const especiality = Speciality.create(data);

    const specialityExists = await this.specialityRepository.findbyName(
      data.name
    );

    if (specialityExists) {
      throw new CustomError(
        "Speciality already exists.",
        StatusCodes.BAD_REQUEST,
        "USER_EXISTS"
      );
    }

    const specialityCreated = await this.specialityRepository.save(especiality);

    return specialityCreated;
  }
}
