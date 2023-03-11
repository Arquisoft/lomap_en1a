import { Console } from "console";
import { PlaceServiceImpl } from "../../../business/place/PlaceServiceImpl";
import { PlaceDto } from "../../../domain/dtos/PlaceDto";
import { UserDto } from "../../../domain/dtos/UserDto";
import { PlaceVisibility } from "../../../domain/Visibility";
import { PlaceRepositoryImpl } from "../../../repositories/PlaceRepositoryImpl";
import { MySql } from "./MySql";


var b: MySql = MySql.getInstance();
var a: PlaceRepositoryImpl = new PlaceRepositoryImpl();
var c: PlaceServiceImpl = new PlaceServiceImpl();

var u = new UserDto();
u.podId = "USUARIO1";

var p = new PlaceDto();
p.id = "3";
p.latitude = 1.23;
p.longitude = 1.23;
p.name = "SITIO3";
p.visibility = PlaceVisibility.USER;


c.add(p, u);




