import { Comment } from "../../domain/Comment";

export interface CommentRepository {

    add(comment: Comment, podId: string): boolean;
    findById(id: string): Promise<Comment>;
    findByUser(user: string): Promise<Comment[]>;
    findByPlace(place: string): Promise<Comment[]>;
}