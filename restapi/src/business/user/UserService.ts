import { User } from "../../domain/User";

export interface UserService {

    getProfile(sessionId: string, webId: string): Promise<User>;
    getFriends(sessionId: string, webId: string): Promise<User[]>;
}