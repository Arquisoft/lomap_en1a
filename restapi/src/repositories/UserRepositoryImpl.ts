import { UserRepository } from "../business/repositories/UserRepository";
import { User } from "../domain/User";
import { PodManager } from "./pods/PodManager";

export class UserRepositoryImpl implements UserRepository {

    getProfile(sessionId: string, webId: string): Promise<User> {
        return PodManager.dataManager.getUser(sessionId, webId);
    }
    getFriends(sessionId: string, webId: string): Promise<User[]> {
        return PodManager.dataManager.getFriends(sessionId, webId);
    }
}
