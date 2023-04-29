import { User } from "../../domain/User";

/**
 * Declares methods to manage user storage and information fetching.
 * <p>
 * Is used by the User service to perform its operations.
 */
export interface UserRepository {
  /**
   * Gets the profile information of the specified webId.
   * As of now, only retrieves the name and webId.
   * @param sessionId
   * @param id
   * @returns A user with the fetched infomation.
   */
  getProfile(sessionId: string, id: string): Promise<User>;

  /**
   * Retrieves the list of friends for the specified user.
   * @param sessionId
   * @param id WebID of the user whose friends we want to fetch.
   * @returns A list of users.
   */
  getFriends(sessionId: string, id: string): Promise<User[]>;

  /**
   * Returns true if the current user is logged in.
   * @param sessionId
   */
  isLoggedIn(sessionId: string): Promise<boolean>;

  addFriend(sessionId: string, webId: string): Promise<boolean>;

  sharePublicPlaces(sessionId: string): Promise<boolean>;

  getPublicUsers(sessionId: string): Promise<User[]>;

  getFriendRequests(sessionId: string): Promise<User[]>;
}
