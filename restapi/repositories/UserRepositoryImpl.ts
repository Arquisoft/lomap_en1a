import { UserRepository } from "../business/repositories/UserRepository";
import { User } from "../domain/User";

export class UserRepositoryImpl implements UserRepository {

    private u: User = new User("1", "User 1", "podId");

    async findById(id: string): Promise<User> {
        return this.u;
    }
}