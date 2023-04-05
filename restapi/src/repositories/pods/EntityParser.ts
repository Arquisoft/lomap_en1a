import { SolidDataset, Thing, getDate, getDecimal, getStringNoLocale, getThing } from "@inrupt/solid-client";
import { Comment } from "../../../../domain/Comment";
import { Place } from "../../../../domain/Place";
import { Score } from "../../../../domain/Score";
import { Picture } from "../../../../domain/Picture";
import { SCHEMA_INRUPT } from "@inrupt/vocab-common-rdf";
import { Visibility } from "../../../../domain/Visibility";

export class EntityParser {

    public parseComments(dataSet: SolidDataset): Comment[] {

        let comments: Comment[] = []

        for (let c in dataSet.graphs.default) {
            let comment = dataSet.graphs.default[c];

            comments.push(this.parseComment(dataSet, comment))
        }

        return comments;
    }

    private parseComment(dataSet: SolidDataset, comment: any): Comment {

        let thing: Thing = getThing(dataSet, comment.url) as Thing;

        let id = getStringNoLocale(thing, SCHEMA_INRUPT.identifier)

        if (id == null) {
            id = "NO ID"
        }

        let text = getStringNoLocale(thing, SCHEMA_INRUPT.text)

        if (text == null) {
            text = "NO TEXT"
        }

        let owner = getStringNoLocale(thing, SCHEMA_INRUPT.Person)

        if (owner == null) {
            owner = "NO OWNER"
        }

        let place = getStringNoLocale(thing, SCHEMA_INRUPT.address)

        if (place == null) {
            place = "NO PLACE"
        }

        let date = getDate(thing, SCHEMA_INRUPT.dateModified)

        if (date == null) {
            date = new Date();
        }

        let visibility = <Visibility>thing.url.split("/")[4]

        return new Comment(id, text, place, owner, date, visibility);
    }

    public parsePlaces(dataSet: SolidDataset): Place[] {

        let places = [];

        for (let p in dataSet.graphs.default) {
            let place = dataSet.graphs.default[p];

            places.push(this.parsePlace(dataSet, place))
        }

        return places;
    }

    private parsePlace(dataSet: SolidDataset, place: any): Place {

        let thing: Thing = getThing(dataSet, place.url) as Thing;

        let id = getStringNoLocale(thing, SCHEMA_INRUPT.identifier)

        if (id == null) {
            id = "NO ID"
        }

        let name = getStringNoLocale(thing, SCHEMA_INRUPT.name)

        if (name == null) {
            name = "NO NAME"
        }

        let description = getStringNoLocale(thing, SCHEMA_INRUPT.description)

        if (description == null) {
            description = "NO DESCRIPTION"
        }

        let owner = getStringNoLocale(thing, SCHEMA_INRUPT.Person)

        if (owner == null) {
            owner = "NO OWNER"
        }

        let latitude = getDecimal(thing, SCHEMA_INRUPT.latitude)

        if (latitude == null) {
            latitude = 0
        }

        let longitude = getDecimal(thing, SCHEMA_INRUPT.longitude)

        if (longitude == null) {
            longitude = 0
        }

        let visibility = <Visibility>thing.url.split("/")[4]

        return new Place(id, name, description, owner, latitude, longitude, visibility);
    }

    public parseScores(dataSet: SolidDataset): Score[] {

        let scores: Score[] = []

        for (let s in dataSet.graphs.default) {
            let score = dataSet.graphs.default[s];

            scores.push(this.parseScore(dataSet, score))
        }

        return scores;
    }

    private parseScore(dataSet: SolidDataset, score: any): Score {
        let thing: Thing = getThing(dataSet, score.url) as Thing;

        let id = getStringNoLocale(thing, SCHEMA_INRUPT.identifier)

        if (id == null) {
            id = "NO ID"
        }

        let val = getDecimal(thing, SCHEMA_INRUPT.value)

        if (val == null) {
            val = -1
        }

        let owner = getStringNoLocale(thing, SCHEMA_INRUPT.Person)

        if (owner == null) {
            owner = "NO OWNER"
        }

        let place = getStringNoLocale(thing, SCHEMA_INRUPT.address)

        if (place == null) {
            place = "NO PLACE"
        }

        let date = getDate(thing, SCHEMA_INRUPT.dateModified)

        if (date == null) {
            date = new Date();
        }

        let visibility = <Visibility>thing.url.split("/")[4]

        return new Score(id, val, place, owner, date, visibility);
    }

    public parsePictures(dataSet: SolidDataset): Picture[] {

        let pictures: Picture[] = []

        for (let p in dataSet.graphs.default) {
            let picture = dataSet.graphs.default[p];

            pictures.push(this.parsePicture(dataSet, picture))
        }

        return pictures;
    }

    private parsePicture(dataSet: SolidDataset, picture: any): Picture {
        let thing: Thing = getThing(dataSet, picture.url) as Thing;

        let id = getStringNoLocale(thing, SCHEMA_INRUPT.identifier)

        if (id == null) {
            id = "NO ID"
        }

        let url = getStringNoLocale(thing, SCHEMA_INRUPT.url)

        if (url == null) {
            url = "NO URL"
        }

        let owner = getStringNoLocale(thing, SCHEMA_INRUPT.Person)

        if (owner == null) {
            owner = "NO OWNER"
        }

        let place = getStringNoLocale(thing, SCHEMA_INRUPT.address)

        if (place == null) {
            place = "NO PLACE"
        }

        let date = getDate(thing, SCHEMA_INRUPT.dateModified)

        if (date == null) {
            date = new Date();
        }

        let visibility = <Visibility>thing.url.split("/")[4]

        return new Picture(id, url, place, owner, date, visibility);
    }
}