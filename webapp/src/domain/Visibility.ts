import { BaseEntity } from "./BaseEntity";
import { Group } from "./Group";
import { Place } from "./Place";
import { User } from "./User";

export enum PlaceVisibility {
    USER = "USER",
    GROUP = "GROUP",
    FRIENDS = "FRIENDS",
    FULL = "FULL"
}

export enum GroupVisibility {
    PRIVATE,
    PUBLIC
}