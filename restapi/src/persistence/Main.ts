import { CommentServiceImpl } from "../../business/comment/CommentServiceImpl";
import { PlaceServiceImpl } from "../../business/place/PlaceServiceImpl";
import { UserDAO } from "./user/UserDAO";
import { Comment } from "../../domain/Comment";
import { PlaceDto } from "../../domain/dtos/PlaceDto";

const a = new UserDAO();


var c: CommentServiceImpl = new CommentServiceImpl();

var place: PlaceDto = new PlaceDto();
place.id = "1";

var comment: Promise<Comment[]> = c.findByPlace(place);

comment.then(c => {
    console.log(c);
})