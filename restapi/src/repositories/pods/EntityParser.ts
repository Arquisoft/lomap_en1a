import { SolidDataset, Thing, getThing } from "@inrupt/solid-client";
import { Comment } from "../../../../domain/Comment";
import { Place } from "../../../../domain/Place";
import { Score } from "../../../../domain/Score";
import { Picture } from "../../../../domain/Picture";

export class EntityParser {

    public parseComments(dataSet: SolidDataset, url: string): Comment[] {

        let comments: Comment[] = []

        let thing = getThing(dataSet, url);

        console.log(thing)

        return [];
    }

    public parsePlaces(dataSet: SolidDataset, url: string): Place[] {

        let thing = getThing(dataSet, url);

        console.log(thing)

        return [];
    }

    public parseScores(dataSet: SolidDataset, url: string): Score[] {

        let thing = getThing(dataSet, url);

        console.log(thing)

        return [];
    }

    public parsePictures(dataSet: SolidDataset, url: string): Picture[] {

        let thing = getThing(dataSet, url);

        console.log(thing)

        return [];
    }
}