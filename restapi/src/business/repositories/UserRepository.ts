import { User } from "../../../../domain/User";

export interface UserRepository {

    getProfile(sessionId: string, id: string): Promise<User>;
    getFriends(sessionId: string, id: string): Promise<User[]>;
}