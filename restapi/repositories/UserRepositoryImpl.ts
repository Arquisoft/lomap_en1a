import { resolve } from "path";
import { UserRepository } from "../business/repositories/UserRepository";
import { User } from "../domain/User";
import { MySql } from "../src/persistence/db/MySql";

export class UserRepositoryImpl implements UserRepository {

    private u: User = new User("1", "User 1", "podId");
    private mysql: MySql = MySql.getInstance();

    findById(id: string): Promise<User> {
        return new Promise((resolve, reject) => {
            this.mysql.con.query(
                "SELECT * FROM USERS WHERE PODID = '" + id + "';",
                (err: any, result: any, fields: any) => {
                    var length = Object.keys(result).length;
                    var places: Place[] = new Array(length);
                    Object.keys(result).forEach(function (key) {
                        var aux: number = +key;
                        var row = result[key];
                        places[aux] = new Place(
                            row.PLACE_ID,
                            row.NAME,
                            row.OWNER_ID,
                            (<any>PlaceVisibility)[row.VISIBILITY],
                            row.LATITUDE,
                            row.LONGITUDE
                        );




                    });

                    resolve(places);
                }
            );
        });
    }
}