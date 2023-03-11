import { Console } from "console";
import { PlaceServiceImpl } from "../../../business/place/PlaceServiceImpl";
import { UserDto } from "../../../domain/dtos/UserDto";
import { PlaceRepositoryImpl } from "../../../repositories/PlaceRepositoryImpl";
import { MySql } from "./MySql";


var b: MySql = MySql.getInstance();
var a: PlaceRepositoryImpl = new PlaceRepositoryImpl();
var c: PlaceServiceImpl = new PlaceServiceImpl();

var u = new UserDto();
u.podId = "USUARIO1";

c.getAllPlaces(u).then((list) => console.log(list));




