import { Comment } from "../../domain/Comment";

/**
 * Declares methods to manage comment storage.
 * <p>
 * Is used by the Comment service to perform its operations.
 */
export interface CommentRepository {
  /**
   * Adds a comment to the user's POD.
   * @param sessionId
   * @param comment
   * @returns True if the operation was successful, false otherwise.
   */
  add(sessionId: string, comment: Comment): Promise<boolean>;

  /**
   * Finds comments posted about a specific place.
   * @param sessionId
   * @param place Id of the place
   * @returns A list of the comments found.
   */
  findByPlace(sessionId: string, place: string): Promise<Comment[]>;
}
