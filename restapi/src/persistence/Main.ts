import { CommentServiceImpl } from "../../business/comment/CommentServiceImpl";
import { PlaceServiceImpl } from "../../business/place/PlaceServiceImpl";
import { UserDAO } from "./user/UserDAO";

const a = new UserDAO();


var c: CommentServiceImpl = new CommentServiceImpl();

c.findById("1");