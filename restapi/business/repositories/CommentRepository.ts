import { Comment } from "../../domain/Comment";
import { User } from "../../domain/User";
import { Place } from "../../domain/Place";

export interface CommentRepository {

    add(comment: Comment, podId: string): boolean;
    findById(id: string): Comment;
    findByUser(user: string): Comment[];
    findByPlace(user: Place): Comment[];
}