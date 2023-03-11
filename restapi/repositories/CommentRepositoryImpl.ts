import { CommentRepository } from "../business/repositories/CommentRepository";
import { Comment } from "../domain/Comment";
import { Place } from "../domain/Place";
import { User } from "../domain/User";
import { PlaceVisibility } from "../domain/Visibility";
import { MySql } from "../src/persistence/db/MySql";

export class CommentRepositoryImpl implements CommentRepository {


    private mysql = MySql.getInstance();

    async findById(id: string): Promise<Comment> {
        return new Promise((resolve, reject) => {
            this.mysql.con.query(
                "SELECT * FROM COMMENTS WHERE COMMENT_ID= '" + id + "';",

                (err: any, result: any, fields: any) => {
                    var aux = new Comment("", "", "", "");
                    Object.keys(result).forEach(function (key) {
                        var row = result[key];
                        aux = new Comment(
                            row.COMMENT_ID,
                            row.TEXT,
                            row.PLACE_ID,
                            row.OWNER_ID);

                    });

                    resolve(aux);
                }
            );
        });
    }
    async findByUser(user: string): Promise<Comment[]> {
        return new Promise((resolve, reject) => {
            this.mysql.con.query(
                "SELECT * FROM COMMENTS WHERE OWNER_ID = '" + user + "';",
                (err: any, result: any, fields: any) => {
                    var length = Object.keys(result).length;
                    var places: Comment[] = new Array(length);
                    Object.keys(result).forEach(function (key) {
                        var aux: number = +key;
                        var row = result[key];
                        places[aux] = new Comment(
                            row.COMMENT_ID,
                            row.TEXT,
                            row.PLACE_ID,
                            row.OWNER_ID);
                    });

                    resolve(places);
                }
            );
        });
    }
    async findByPlace(place: string): Promise<Comment[]> {
        return new Promise((resolve, reject) => {
            this.mysql.con.query(
                "SELECT * FROM COMMENTS WHERE PLACE_ID = '" + place + "';",
                (err: any, result: any, fields: any) => {
                    var length = Object.keys(result).length;
                    var places: Comment[] = new Array(length);
                    Object.keys(result).forEach(function (key) {
                        var aux: number = +key;
                        var row = result[key];
                        places[aux] = new Comment(
                            row.COMMENT_ID,
                            row.TEXT,
                            row.PLACE_ID,
                            row.OWNER_ID);
                    });

                    resolve(places);
                }
            );
        });
    }

    add(comment: Comment): boolean {
        this.mysql.con.query(
            "INSERT INTO COMMENTS VALUES (" +
            "'" + comment.getId() + "'," +
            "'" + comment.getText() + "'," +
            "'" + comment.getPlace() + "'," +
            "'" + comment.getOwner() + "'" +
            ");",
            (err: any, result: any, fields: any) => {


            }
        );

        return true;
    }

}