//Factory
import { Factory } from "../../Factory";

//Entities
import { Place } from "../../domain/Place";

//Dtos
import { PlaceDto } from "../../domain/dtos/PlaceDto";

//Services
import { PlaceService } from "./PlaceService";

//Repositories
import { PlaceRepository } from "../repositories/PlaceRepository";

//Others
import { v4 as generateUUID } from "uuid";

export class PlaceServiceImpl implements PlaceService {
  private placeRepository: PlaceRepository =
    Factory.repositories.getPlaceRepository();

  async add(sessionId: string, place: PlaceDto): Promise<Place> {
    let id = generateUUID();
    let name = place.name;
    let description = place.description;
    let latitude = place.latitude;
    let longitude = place.longitude;
    let visibility = place.visibility;
    let category = place.category;

    if (name == undefined || name == null)
      throw new Error("The name cannot be undefined.");

    if (description == undefined || description == null)
      throw new Error("The description cannot be undefined.");

    if (latitude == undefined || latitude == null)
      throw new Error("The latitude cannot be undefined.");
    if (latitude > 90 || latitude < -90)
      throw new Error("The latitude value is out of bounds.");

    if (longitude == undefined || longitude == null)
      throw new Error("The longitude cannot be undefined.");
    if (longitude > 90 || longitude < -90)
      throw new Error("The longitude value is out of bounds.");

    if (visibility == undefined || visibility == null)
      throw new Error("The visibility cannot be undefined.");

    if (category == undefined || category == null)
      throw new Error("The category cannot be undefined.");

    let p = new Place(
      id,
      name,
      description,
      "",
      latitude,
      longitude,
      visibility,
      category
    );

    if (await this.placeRepository.add(sessionId, p)) return p;

    throw new Error("The place could not be added.");
  }

  async findOwn(sessionId: string): Promise<Place[]> {
    return this.placeRepository.findOwn(sessionId);
  }

  async findFriendForUser(sessionId: string, user: string): Promise<Place[]> {
    return this.placeRepository.findFriendForUser(sessionId, user);
  }

  async findFriend(sessionId: string): Promise<Place[]> {
    return this.placeRepository.findFriend(sessionId);
  }

  async findPublic(sessionId: string, webId: string): Promise<Place[]> {
    return this.placeRepository.findPublic(sessionId, webId);
  }

  async findOwnPublic(sessionId: string): Promise<Place[]> {
    return this.placeRepository.findOwnPublic(sessionId);
  }

  async findSharedFriends(sessionId: string): Promise<Place[]> {
    return this.placeRepository.findSharedFriends(sessionId);
  }

  async findAll(sessionId: string): Promise<Place[]> {
    return this.placeRepository.findAll(sessionId);
  }
}
