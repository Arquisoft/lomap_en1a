import { PlaceRepository } from "../business/repositories/PlaceRepository";
import { Place } from "../domain/Place";
import { PodManager } from "./pods/PodManager";
import { SolidDataset } from "@inrupt/solid-client";
import { User } from "../domain/User";
import { Worker } from "./pararelism/Worker";
import { asyncParallelForEach } from "async-parallel-foreach";

export class PlaceRepositoryImpl implements PlaceRepository {
  async add(sessionId: string, place: Place): Promise<boolean> {
    let webId = await PodManager.sessionManager.getCurrentWebId(sessionId);

    place.setOwner(webId);

    return PodManager.dataManager.writeData(
      sessionId,
      "places",
      PodManager.rdfCreator.createPlace(place),
      webId,
      place.getVisibility().toLowerCase()
    );
  }

  async findOwn(sessionId: string): Promise<Place[]> {
    let user: string = await PodManager.sessionManager.getCurrentWebId(
      sessionId
    );
    return this.find(sessionId, user, "private");
  }

  async findFriend(sessionId: string): Promise<Place[]> {
    let user: string = await PodManager.sessionManager.getCurrentWebId(
      sessionId
    );
    return this.find(sessionId, user, "friends");
  }

  async findFriendForUser(sessionId: string, user: string): Promise<Place[]> {
    return this.find(sessionId, user, "friends");
  }

  async findOwnPublic(sessionId: string): Promise<Place[]> {
    let user: string = await PodManager.sessionManager.getCurrentWebId(
      sessionId
    );
    return this.find(sessionId, user, "public");
  }

  async findPublic(sessionId: string, webId: string): Promise<Place[]> {
    return this.find(sessionId, webId, "public");
  }

  private async find(sessionId: string, user: string, zone: string) {
    let dataset: SolidDataset = await PodManager.dataManager.fetchData(
      sessionId,
      "places",
      user,
      zone
    );

    return PodManager.entityParser.parsePlaces(dataset);
  }

  async findSharedFriends(sessionId: string): Promise<Place[]> {
    let webId = await PodManager.sessionManager.getCurrentWebId(sessionId);

    let friendsWebIds: string[] = (
      await PodManager.dataManager.getFriends(sessionId, webId)
    ).map((f) => f.getWebId());

    let workers: Worker[] = [];
    let places: Place[] = [];
    let resource = "$webIdlomap/$visibility/places";

    friendsWebIds.forEach((webId: string) => {
      workers.push(
        new Worker(
          sessionId,
          resource.replace("$webId", webId).replace("$visibility", "friends")
        )
      );
    });

    if (workers.length == 0) return places;

    await asyncParallelForEach(workers, -1, async (w: Worker) => {
      await w.run();
    });

    workers.forEach((w) => {
      places = places.concat(
        PodManager.entityParser.parsePlaces(w.getResult())
      );
    });

    return places;
  }

  async findAll(sessionId: string): Promise<Place[]> {
    let webId = await PodManager.sessionManager.getCurrentWebId(sessionId);

    let friendsWebIds: string[] = (
      await PodManager.dataManager.getFriends(sessionId, webId)
    ).map((f) => f.getWebId());

    let workers: Worker[] = [];
    let aux: string[] = [];
    let places: Place[] = [];
    let resource = "$webIdlomap/$visibility/places";

    workers.push(
      new Worker(
        sessionId,
        resource.replace("$webId", webId).replace("$visibility", "private")
      )
    );

    workers.push(
      new Worker(
        sessionId,
        resource.replace("$webId", webId).replace("$visibility", "friends")
      )
    );

    workers.push(
      new Worker(
        sessionId,
        resource.replace("$webId", webId).replace("$visibility", "public")
      )
    );

    if (workers.length == 0) return places;

    await asyncParallelForEach(workers, -1, async (w: Worker) => {
      await w.run();
    });

    workers.forEach((w) => {
      places = places.concat(
        PodManager.entityParser.parsePlaces(w.getResult())
      );
    });

    return places;
  }
}
