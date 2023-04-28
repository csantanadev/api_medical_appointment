import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { JWTToken } from "../../token/jwt.token";

export const ensureAuthenticate = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const headerAuth = request.headers.authorization || "";

  if (!headerAuth) {
    return response
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: "Token is missing" });
  }

  const [, token] = headerAuth.split(" ");

  if (!token) {
    return response
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: "Token is missing" });
  }

  const verifyToken = new JWTToken().validate(token);

  if (!verifyToken) {
    return response
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: "Token invalid" });
  }

  request.userId = verifyToken.sub;

  return next();
};
