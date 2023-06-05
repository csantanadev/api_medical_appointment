import { JWTToken } from "../../../../infra/shared/token/jwt.token";
import { UserPrismaRepository } from "../../repositories/implementations/user.prisma.repository";
import { RefreshTokenController } from "./refresh-token.controller";
import { RefreshTokenUserUseCase } from "./refresh-token.usecase";

const jwtToken = new JWTToken();
const userRepository = new UserPrismaRepository();

const refreshTokenUseCase = new RefreshTokenUserUseCase(
  jwtToken,
  userRepository
);

const refreshTokenController = new RefreshTokenController(refreshTokenUseCase);

export { refreshTokenController };
