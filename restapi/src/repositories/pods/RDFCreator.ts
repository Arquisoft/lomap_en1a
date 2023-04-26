//Entities
import { Place } from "../../domain/Place";
import { Comment } from "../../domain/Comment";
import { Picture } from "../../domain/Picture";
import { Score } from "../../domain/Score";

import { Thing, buildThing, createThing } from "@inrupt/solid-client";
import { SCHEMA_INRUPT } from "@inrupt/vocab-common-rdf";

export class RDFCreator {

    public createComment(comment: Comment): Thing {
        return buildThing(createThing({ name: comment.getId() }))
            .addStringNoLocale(SCHEMA_INRUPT.identifier, comment.getId())
            .addStringNoLocale(SCHEMA_INRUPT.text, comment.getText())
            .addStringNoLocale(SCHEMA_INRUPT.Person, comment.getOwner())
            .addStringNoLocale(SCHEMA_INRUPT.address, comment.getPlace())
            .addDatetime(SCHEMA_INRUPT.dateModified, comment.getDate())
            .build();
    }

    public createPicture(picture: Picture): Thing {
        return buildThing(createThing({ name: picture.getId() }))
            .addStringNoLocale(SCHEMA_INRUPT.identifier, picture.getId())
            .addStringNoLocale(SCHEMA_INRUPT.url, picture.getUrl())
            .addStringNoLocale(SCHEMA_INRUPT.Person, picture.getOwner())
            .addStringNoLocale(SCHEMA_INRUPT.address, picture.getPlace())
            .addDatetime(SCHEMA_INRUPT.dateModified, picture.getDate())
            .build();
    }

    public createScore(score: Score): Thing {
        return buildThing(createThing({ name: score.getId() }))
            .addStringNoLocale(SCHEMA_INRUPT.identifier, score.getId())
            .addDecimal(SCHEMA_INRUPT.value, score.getScore())
            .addStringNoLocale(SCHEMA_INRUPT.Person, score.getOwner())
            .addStringNoLocale(SCHEMA_INRUPT.address, score.getPlace())
            .addDatetime(SCHEMA_INRUPT.dateModified, score.getDate())
            .build();
    }

    public createPlace(place: Place): Thing {
        return buildThing(createThing({ name: place.getId() }))
            .addStringNoLocale(SCHEMA_INRUPT.identifier, place.getId())
            .addStringNoLocale(SCHEMA_INRUPT.name, place.getName())
            .addStringNoLocale(SCHEMA_INRUPT.description, place.getDescription())
            .addStringNoLocale(SCHEMA_INRUPT.Person, place.getOwner())
            .addStringNoLocale(SCHEMA_INRUPT.brand, place.getCategory())
            .addDecimal(SCHEMA_INRUPT.latitude, place.getLatitude())
            .addDecimal(SCHEMA_INRUPT.longitude, place.getLongitude())
            .build();
    }
}