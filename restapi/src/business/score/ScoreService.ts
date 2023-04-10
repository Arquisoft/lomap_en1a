import { ScoreDto } from "../../domain/dtos/ScoreDto";
import { Score } from "../../domain/Score";

/**
 * Declares methods to manage score storage.
 * <p>
 * All methods require the sessionId of the user making the request, for authentication and identification purposes at POD level.
 */
export interface ScoreService {

    /**
     * Adds a score.
     * @param sessionId
     * @param score DTO with the score information
     * @returns True if the operation was successful, false otherwise.
     */
    add(sessionId: string, score: ScoreDto): Promise<boolean>;

    /**
     * Finds scores posted by a user.
     * @param sessionId
     * @param user REMOVE
     * @returns A list of scores posted by the user.
     */
    // TODO: remove 'user'
    findOwn(sessionId: string, user: string): Promise<Score[]>;

    /**
     * Finds scores posted about a place.
     * @param sessionId
     * @param place ID of the place for which to find scores.
     * @returns A list of scores posted about a place.
     */
    findByPlace(sessionId: string, place: string): Promise<Score[]>;
}