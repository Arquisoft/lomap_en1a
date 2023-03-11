import { CommentRepository } from "../business/repositories/CommentRepository";
import { Comment } from "../domain/Comment";
import { Place } from "../domain/Place";
import { User } from "../domain/User";
import { PlaceVisibility } from "../domain/Visibility";

export class CommentRepositoryImpl implements CommentRepository {


    private comments: Comment[] = [new Comment("1", "Comment", new Place("1", "Place 1", "podId", PlaceVisibility.USER, 1, 1), "podId")];

    async findById(id: string): Promise<Comment> {
        throw Error("not implemented");
    }
    async findByUser(user: string): Promise<Comment[]> {
        throw Error("not implemented");
    }
    async findByPlace(user: Place): Promise<Comment[]> {
        throw Error("not implemented");
    }

    add(comment: Comment): boolean {
        this.comments.push(comment);
        return true;
    }
}