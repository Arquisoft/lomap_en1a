import { Score } from "../../domain/Score";

/**
 * Declares methods to manage score storage.
 * <p>
 * Is used by the Score service to perform its operations.
 */
export interface ScoreRepository {
  /**
   * Adds a score to the user's POD.
   * @param sessionId
   * @param score
   * @returns True if the operation was successful, false otherwise.
   */
  add(sessionId: string, score: Score): Promise<boolean>;

  /**
   * Finds scores posted by a specific user.
   * @param sessionId
   * @param user REMOVE
   * @returns A list of the scores found.
   */
  // TODO: Remove 'user'
  findOwn(sessionId: string, user: string): Promise<Score[]>;

  /**
   * Finds scores posted about a specific place.
   * @param sessionId
   * @param place Id of the place
   * @returns A list of the scores found.
   */
  findByPlace(sessionId: string, place: string): Promise<Score[]>;
}
