import { PictureRepository } from "../business/repositories/PictureRepository";
import { Place } from "../domain/Place";
import { User } from "../domain/User";
import { Picture } from "../domain/Picture";
import { PlaceVisibility } from "../domain/Visibility";
import { MySql } from "../src/persistence/db/MySql";

export class PictureRepositoryImpl implements PictureRepository {
    
    private mysql = MySql.getInstance();

    async findById(id: string): Promise<Picture> {
        return new Promise((resolve, reject) => {
            this.mysql.con.query(
                "SELECT * FROM PICTURE WHERE PICTURE_ID= '" + id + "';",

                (err: any, result: any, fields: any) => {
                    var aux = new Picture("", "", "", "");
                    Object.keys(result).forEach(function (key) {
                        var row = result[key];
                        aux = new Picture(
                            row.PICTURE_ID,
                            row.URL,
                            row.PLACE_ID,
                            row.OWNER_ID);

                    });

                    resolve(aux);
                }
            );
        });
    }
    async findByUser(user: string): Promise<Picture[]> {
        return new Promise((resolve, reject) => {
            this.mysql.con.query(
                "SELECT * FROM PICTURES WHERE OWNER_ID = '" + user + "';",
                (err: any, result: any, fields: any) => {
                    var length = Object.keys(result).length;
                    var pictures: Picture[] = new Array(length);
                    Object.keys(result).forEach(function (key) {
                        var aux: number = +key;
                        var row = result[key];
                        pictures[aux] = new Picture(
                            row.PICTURE_ID,
                            row.URL,
                            row.PLACE_ID,
                            row.OWNER_ID);
                    });

                    resolve(pictures);
                }
            );
        });
    }

    async findByPlace(place: Place): Promise<Picture[]> {
        return new Promise((resolve, reject) => {
            this.mysql.con.query(
                "SELECT * FROM PICTURES WHERE PICTURE_ID = '" + place + "';",
                (err: any, result: any, fields: any) => {
                    var length = Object.keys(result).length;
                    var pictures: Picture[] = new Array(length);
                    Object.keys(result).forEach(function (key) {
                        var aux: number = +key;
                        var row = result[key];
                        pictures[aux] = new Picture(
                            row.PICTURE_ID,
                            row.URL,
                            row.PLACE_ID,
                            row.OWNER_ID);
                    });

                    resolve(pictures);
                }
            );
        });
    }

    add(picture: Picture): boolean {
        this.mysql.con.query(
            "INSERT INTO PICTURES VALUES (" +
            "'" + picture.getId() + "'," +
            "'" + picture.getUrl() + "'," +
            "'" + picture.getPlace() + "'," +
            "'" + picture.getOwner() + "'" +
            ");",
            (err: any, result: any, fields: any) => {


            }
        );

        return true;
    }
}