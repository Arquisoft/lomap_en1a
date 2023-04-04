import { PlaceRepository } from "../business/repositories/PlaceRepository";
import { Place } from "../domain/Place";
import { PlaceVisibility } from "../domain/Visibility";
import { MySql } from "../src/persistence/db/MySql";

export class PlaceRepositoryImpl implements PlaceRepository {

    private mysql = MySql.getInstance();

    async findById(id: String): Promise<Place> {
        return new Promise((resolve, reject) => {
            this.mysql.con.query(
                "SELECT * FROM PLACES WHERE PLACE_ID= '" + id + "';",

                (err: any, result: any, fields: any) => {
                    var aux = new Place("", "", "", PlaceVisibility.FRIENDS, 0, 0);
                    Object.keys(result).forEach(function (key) {
                        var row = result[key];
                        aux = new Place(
                            row.PLACE_ID,
                            row.NAME,
                            row.OWNER_ID,
                            (<any>PlaceVisibility)[row.VISIBILITY],
                            row.LATITUDE,
                            row.LONGITUDE);
                    

                    });

                    resolve(aux);
                }
            );
        });

    }

    add(place: Place): boolean {
        this.mysql.con.query(
            "INSERT INTO PLACES VALUES (" +
            "'" + place.getId() + "'," +
            "'" + place.getName() + "'," +
            "'" + place.getOwner() + "'," +
            "'" + PlaceVisibility[place.getVisibility()] + "'," +
            "" + place.getLatitude() + "," +
            "'" + place.getLongitude() + "'" +
            ");",
            (err: any, result: any, fields: any) => {
                console.log("ADDED");

            }
        );

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