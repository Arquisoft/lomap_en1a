import { Repository } from "../Repository";
import { User } from "../../../domain/User";

export class UserRepository implements Repository<User>{
    get(id: String): User {
        throw new Error("Method not implemented.");
    }
    remove(id: String) {
        throw new Error("Method not implemented.");
    }
    insert(entity: User) {
        throw new Error("Method not implemented.");
    }
    update(entity: User) {
        throw new Error("Method not implemented.");
    }

}