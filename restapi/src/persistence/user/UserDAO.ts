
import { User } from "../../../domain/User";
import { MySql } from "../db/MySql";


export class UserDAO {

    mysql = MySql.getInstance();

    getTbyId = async (id: String) => {
        var res;
        await this.mysql.get("USER", "").then((result: any) => res = result);

    
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