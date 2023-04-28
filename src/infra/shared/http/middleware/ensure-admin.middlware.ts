import { UserPrismaRepository } from "./../../../../modules/users/repositories/implementations/user.prisma.repository";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const ensureAadmin = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const userRepository = new UserPrismaRepository();
  const user = await userRepository.findByUserId(request.userId);

  if (!user) {
    return response
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "User does not exists." });
  }

  if (!user.isAdmin) {
    return response
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "User is not admin." });
  }

  return next();
};
