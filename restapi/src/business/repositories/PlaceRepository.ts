import { Place } from "../../domain/Place";

/**
 * Declares methods to manage place storage.
 * <p>
 * Is used by the Place service to perform its operations.
 */
export interface PlaceRepository {
  /**
   * Adds a place to the user's POD.
   * @param sessionId
   * @param place
   * @returns True if the operation was successful, false otherwise.
   */
  add(sessionId: string, place: Place): Promise<boolean>;

  /**
   * Finds places posted by the current user.
   * @param sessionId
   * @returns A list of places.
   */
  findOwn(sessionId: string): Promise<Place[]>;

  /**
   * Finds places posted to friends of the current user.
   * @param sessionId
   * @returns A list of the places posted to friends.
   */
  findFriend(sessionId: string): Promise<Place[]>;

  /**
   * Finds places posted to friends of a specific user.
   * @param sessionId
   * @param user WebID of the poster.
   * @returns A list of places posted by the user.
   */
  findFriendForUser(sessionId: string, user: string): Promise<Place[]>;

  /**
   * Finds all public places of the current user.
   * @param sessionId
   * @returns A list of the places publicly posted by the current user.
   */
  findPublic(sessionId: string, webId: string): Promise<Place[]>;

  /**
   * Finds all the places shared to the current user by its friends.
   * @param sessionId
   * @returns A list of plcaes posted by friends of the current user.
   */
  findSharedFriends(sessionId: string): Promise<Place[]>;

  findOwnPublic(sessionId: string): Promise<Place[]>;
}
