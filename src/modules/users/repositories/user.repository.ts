import { User } from "../entities/user.entity";

export interface IUserRepository {
  findByUserId(id: string): Promise<User | undefined>;
  findByUserName(username: string): Promise<User | undefined>;
  save(data: User): Promise<User>;
}
