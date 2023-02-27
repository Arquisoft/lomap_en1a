
import { User } from "../../domain/User";
import { DAO } from "../DAO";
export class UserDAO implements DAO<User>{

    mysql = new MySql();

    getTbyId(id: String): User {
        var res;
        (async () => {
            res = await this.mysql.get("USER", "");
            return res;
        })().then((result) => res = result);
        console.log(res);
        return res;




    }
    save(entity: User) {
        throw new Error("Method not implemented.");
    }
    remove(entity: User) {
        throw new Error("Method no implemented.");
    }
    update(entity: User) {
        throw new Error("Method not implemented.");
    }

}