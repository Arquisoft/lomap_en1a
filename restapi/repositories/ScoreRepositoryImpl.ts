import { ScoreRepository } from "../business/repositories/ScoreRepository";
import { Place } from "../domain/Place";
import { Score } from "../domain/Score";
import { User } from "../domain/User";
import { PlaceVisibility } from "../domain/Visibility";
import { MySql } from "../src/persistence/db/MySql";

export class ScoreRepositoryImpl implements ScoreRepository {

    private mysql = MySql.getInstance();


    async findById(id: string): Promise<Score> {
        return new Promise((resolve, reject) => {
            this.mysql.con.query(
                "SELECT * FROM SCORES WHERE SCORE_ID= '" + id + "';",

                (err: any, result: any, fields: any) => {
                    var aux = new Score("", 0, "", "");
                    Object.keys(result).forEach(function (key) {
                        var row = result[key];
                        aux = new Score(
                            row.SCORE_ID,
                            row.SCORE,
                            row.PLACE_ID,
                            row.OWNER_ID);

                    });

                    resolve(aux);
                }
            );
        });
    }

    async findByUser(user: string): Promise<Score[]> {
        return new Promise((resolve, reject) => {
            this.mysql.con.query(
                "SELECT * FROM SCORES WHERE OWNER_ID= '" + user + "';",

                (err: any, result: any, fields: any) => {
                    var aux: Score[] = new Array(Object.keys(result).length);
                    Object.keys(result).forEach(function (key) {
                        var aux2: number = +key;
                        var row = result[key];
                        aux[aux2] = (new Score(
                            row.SCORE_ID,
                            row.SCORE,
                            row.PLACE_ID,
                            row.OWNER_ID));


                    });

                    resolve(aux);
                }
            );
        });
    }

    async findByPlace(place: Place): Promise<Score[]> {
        return new Promise((resolve, reject) => {
            this.mysql.con.query(
                "SELECT * FROM SCORES WHERE PLACE_ID= '" + place.getId() + "';",

                (err: any, result: any, fields: any) => {
                    var aux: Score[] = new Array(Object.keys(result).length);
                    Object.keys(result).forEach(function (key) {
                        var aux2: number = +key;
                        var row = result[key];
                        aux[aux2] = (new Score(
                            row.SCORE_ID,
                            row.SCORE,
                            row.PLACE_ID,
                            row.OWNER_ID));


                    });

                    resolve(aux);
                }
            );
        });
    }

    add(score: Score): boolean {
        this.mysql.con.query(
            "INSERT INTO SCORES VALUES (" +
            "'" + score.getId() + "'," +
            "'" + score.getScore() + "'," +
            "'" + score.getPlace() + "'," +
            "'" + score.getOwner() + "'" +
            ");",
            (err: any, result: any, fields: any) => {


            }
        );
        return true;
    }
}