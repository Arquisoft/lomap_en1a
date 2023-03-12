import { User } from "../../domain/User";

export interface UserRepository {

    findById(id: string): Promise<User>;
}