import { prismaClient } from "../../../../infra/databases/prisma.config";
import { User } from "../../entities/user.entity";
import { IUserRepository } from "./../user.repository";

export class UserPrismaRepository implements IUserRepository {
  async findByUserName(username: string): Promise<User | undefined> {
    const user = await prismaClient.user.findUnique({
      where: {
        username,
      },
    });
    return user || undefined;
  }

  async findByUserId(id: string): Promise<User | undefined> {
    const user = await prismaClient.user.findUnique({
      where: {
        id,
      },
    });
    return user || undefined;
  }

  async save(data: User): Promise<User> {
    const user = await prismaClient.user.create({
      data,
    });
    return user;
  }
}
