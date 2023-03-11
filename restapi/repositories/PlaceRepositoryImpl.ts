import { PlaceRepository } from "../business/repositories/PlaceRepository";
import { Place } from "../domain/Place";
import { User } from "../domain/User";
import { PlaceVisibility } from "../domain/Visibility";
import { MySql } from "../src/persistence/db/MySql";

export class PlaceRepositoryImpl implements PlaceRepository {

    private places: Place[] = [new Place("1", "Place 1", "podId", PlaceVisibility.USER, 1, 1)];
    private mysql = MySql.getInstance();

    async findById(id: String): Promise<Place> {
        return new Promise((resolve, reject) => {
            this.mysql.con.query(
                "SELECT * FROM PLACES WHERE PLACE_ID= " + id + ";",
                (result: any) => {
                    var a = <string>result["VISIBILITY"];
                    var enumA = (<any>PlaceVisibility)[a];


                    resolve(new Place(result["PLACE_ID"],
                        result["NAME"],
                        result["OWNER_ID"],
                        enumA,
                        result["LATITUDE"],
                        result["LONGITUDE"]));
                }
            );
        });

        throw Error("not implemented");
    }

    add(place: Place): boolean {
        this.places.push(place);
        return true;
    }

    getPlacesByVisibility(user: string, visibilty: PlaceVisibility): Promise<Place[]> {
        return new Promise((resolve, reject) => {
            this.mysql.con.query(
                "SELECT * FROM PLACES WHERE VISIBILITY = '" + PlaceVisibility[visibilty] + "' and OWNER_ID = '" + user + "';",
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

                        places



                    });

                    resolve(places);
                }
            );
        });
    }


    getAllPlaces(user: string): Promise<Place[]> {
        return new Promise((resolve, reject) => {
            this.mysql.con.query(
                "SELECT * FROM PLACES WHERE VISIBILITY = 'FULL' OR OWNER_ID = '" + user + "';",
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