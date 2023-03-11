import { CommentDto } from "../../domain/dtos/CommentDto";
import { UserDto } from "../../domain/dtos/UserDto";
import { Comment } from "../../domain/Comment";
import { PlaceDto } from "../../domain/dtos/PlaceDto";

export interface CommentService {

    add(comment: CommentDto, user: UserDto, place: PlaceDto): Promise<boolean>;
    findById(id: string): Promise<Comment>;
    findByUser(user: UserDto): Promise<Comment[]>;
    findByPlace(user: PlaceDto): Promise<Comment[]>;
}