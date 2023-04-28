import { StatusCodes } from "http-status-codes";
import { randomUUID } from "crypto";
import { CustomError } from "../../../errors/custom.error";

type ISpeciality = {
  name: string;
  description: string;
};

export class Speciality {
  readonly id: string;
  name: string;
  description: string;

  private constructor(props: ISpeciality) {
    this.name = props.name;
    this.description = props.description;
    this.id = randomUUID();
  }

  static create(props: ISpeciality) {
    if (!props.name) {
      throw new CustomError(
        "Speciality name is required",
        StatusCodes.UNPROCESSABLE_ENTITY,
        "PARAMETER_REQUIRED"
      );
    }

    const speciality = new Speciality(props);
    return speciality;
  }
}
