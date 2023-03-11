import { Comment } from "../../domain/Comment";
import { User } from "../../domain/User";
import { Place } from "../../domain/Place";

export interface CommentRepository {

    add(comment: Comment, podId: string): boolean;
    findById(id: string): Promise<Comment>;
    findByUser(user: string): Promise<Comment[]>;
    findByPlace(user: Place): Promise<Comment[]>;
}