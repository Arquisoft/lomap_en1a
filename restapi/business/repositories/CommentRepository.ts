import { Comment } from "../../domain/Comment";
import { User } from "../../domain/User";
import { Place } from "../../domain/Place";

export interface CommentRepository {

    add(comment: Comment): boolean;
    findById(id: string): Comment;
    findByUser(user: User): Comment[];
    findByPlace(user: Place): Comment[];
}