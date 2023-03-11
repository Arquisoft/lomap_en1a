import { Console } from "console";
import { CommentServiceImpl } from "../../../business/comment/CommentServiceImpl";
import { PlaceServiceImpl } from "../../../business/place/PlaceServiceImpl";
import { ScoreServiceImpl } from "../../../business/score/ScoreServiceImpl";
import { CommentDto } from "../../../domain/dtos/CommentDto";
import { PlaceDto } from "../../../domain/dtos/PlaceDto";
import { UserDto } from "../../../domain/dtos/UserDto";
import { PlaceVisibility } from "../../../domain/Visibility";
import { PlaceRepositoryImpl } from "../../../repositories/PlaceRepositoryImpl";
import { MySql } from "./MySql";


var b: MySql = MySql.getInstance();
var a: PlaceRepositoryImpl = new PlaceRepositoryImpl();
var c: PlaceServiceImpl = new PlaceServiceImpl();
var d: CommentServiceImpl = new CommentServiceImpl();
var e: ScoreServiceImpl = new ScoreServiceImpl();

var u = new UserDto();
u.podId = "USUARIO1";

var p = new PlaceDto();
p.id = "1";
p.latitude = 1.23;
p.longitude = 1.23;
p.name = "SITIO1";
p.visibility = PlaceVisibility.USER;


//c.add(p, u);

var com = new CommentDto();
com.id = "COMMENT2";
com.text = "MI SEGUNDO COMENTARIO";
com.place = "SITIO1";
com.owner = "USUARIO1";


//d.findById("e4686e1b-8c24-44ed-ad98-ffca867a11f6");
//d.findByUser(u).then((res) => console.log(res));
//d.findByPlace(p).then((res) => console.log(res));
e.findById('2').then((res) => console.log(res));





