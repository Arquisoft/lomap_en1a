import { CommentDto } from "../../domain/dtos/CommentDto";
import { Comment } from "../../domain/Comment";

/**
 * Declares methods to manage comment storage.
 * <p>
 * All methods require the sessionId of the user making the request, for authentication purposes at POD level.
 */
export interface CommentService {
  /**
   * Adds a comment.
   * @param sessionId
   * @param comment DTO with the required comment information.
   * @returns True if the operation was successful, false otherwise.
   */
  add(sessionId: string, comment: CommentDto): Promise<boolean>;

  /**
   * Finds comments posted about a certain place.
   * <p>
   * Retrieves comments posted by the current user or its friends; as log as they have shared said
   * comments with the current user.
   * @param sessionId
   * @param place ID of the place for which to find comments.
   * @returns A list of comments posted about a place.
   */
  findByPlace(sessionId: string, place: string): Promise<Comment[]>;
}
