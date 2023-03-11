import { CommentServiceImpl } from "../../business/comment/CommentServiceImpl";
import { PlaceDto } from "../../domain/dtos/PlaceDto";
import { UserDAO } from "./user/UserDAO";


const a = new UserDAO();


var c: CommentServiceImpl = new CommentServiceImpl();

var place: PlaceDto = new PlaceDto();
place.id = "1";

var comment = c.findByPlace(place);

comment.then(c => {
    console.log(c);
})