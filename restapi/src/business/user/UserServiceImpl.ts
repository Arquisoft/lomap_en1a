import { User } from "../../domain/User";
import { Factory } from "../../Factory";
import { PodManager } from "../../repositories/pods/PodManager";
import { UserRepository } from "../repositories/UserRepository";
import { UserService } from "./UserService";

export class UserServiceImpl implements UserService {

    private userRepository: UserRepository = Factory.repositories.getUserRepository();

    async getProfile(sessionId: string, webId: string): Promise<User> {

        if (webId == "OWN") {
            webId = await PodManager.sessionManager.getCurrentWebId(sessionId);
            // console.log(webId);
            webId = (webId)
        }

        return this.userRepository.getProfile(sessionId, webId);
    }

    async getFriends(sessionId: string, webId: string): Promise<User[]> {
        return this.userRepository.getFriends(sessionId, webId);
    }

    async isLoggedIn(sessionId: string): Promise<boolean> {
        if (sessionId == undefined) {
            return false;
        }

        return this.userRepository.isLoggedIn(sessionId);
    }
}