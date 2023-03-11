import { CommentServiceImpl } from "../../business/comment/CommentServiceImpl";
import { PlaceServiceImpl } from "../../business/place/PlaceServiceImpl";
import { UserDAO } from "./user/UserDAO";
import { Comment } from "../../domain/Comment";

const a = new UserDAO();


var c: CommentServiceImpl = new CommentServiceImpl();

var comment: Promise<Comment> = c.findById("1");

console.log(comment);