import { CommentRepository } from "../business/repositories/CommentRepository";
import { Comment } from "../domain/Comment";
import { Place } from "../domain/Place";
import { User } from "../domain/User";
import { PlaceVisibility } from "../domain/Visibility";

export class CommentRepositoryImpl implements CommentRepository {


    private u: User = new User("1", "User 1", "podId");
    private comments: Comment[] = [new Comment("1", "Comment", new Place("1", "Place 1", this.u, PlaceVisibility.USER, 1, 1), this.u)];

    findById(id: string): Comment {
        return this.comments[0];
    }
    findByUser(user: User): Comment[] {
        return this.comments;
    }
    findByPlace(user: Place): Comment[] {
        return this.comments;
    }

    add(comment: Comment): boolean {
        this.comments.push(comment);
        return true;
    }
}