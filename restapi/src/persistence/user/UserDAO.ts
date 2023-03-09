
import { User } from "../../domain/User";


export class UserDAO {

    mysql = new MySql();

    getTbyId = async (id: String) => {
        var res;
        await this.mysql.get("USER", "").then((result: any) => res = result);

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