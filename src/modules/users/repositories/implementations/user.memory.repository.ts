import { IUserRepository } from './../user.repository';
import { User } from "../../entities/user.entity";

export class UserMemoryRepository implements IUserRepository {

    private users: User[];

    // padrão singleton
    private static instance: UserMemoryRepository;

    private constructor() {
        this.users = []
    }

    async findByUserName(username: string) {
        return this.users.find(user => user.username === username)
    }

    async findByUserId(id: string) {
        return this.users.find(user => user.id === id)
    }

    async save(data: User) {
        this.users.push(data);
        return data;
    }

    static getInstance() {

        if (!this.instance) {
            this.instance = new UserMemoryRepository()
        }

        return this.instance
    }


}