import { User } from "../../../../domain/User";
import { Factory } from "../../Factory";
import { UserRepository } from "../repositories/UserRepository";
import { UserService } from "./UserService";

export class UserServiceImpl implements UserService {

    private userRepository: UserRepository = Factory.repositories.getUserRepository();

    getProfile(sessionId: string, webId: string): Promise<User> {
        return this.userRepository.getProfile(sessionId, webId);
    }

    getFriends(sessionId: string, webId: string): Promise<User[]> {
        return this.userRepository.getFriends(sessionId, webId);
    }

}