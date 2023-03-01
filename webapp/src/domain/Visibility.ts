import { Group } from "./Group";
import { Place } from "./Place";
import { User } from "./User";

export interface PlaceVisibility {
    isVisibleFor(user: User, place: Place): boolean;
}

export class UserPlaceVisilibity implements PlaceVisibility {

    isVisibleFor(user: User, place: Place): boolean {
        return place.getOwner() === user;
    }

}

export class FriendsPlaceVisilibity implements PlaceVisibility {

    isVisibleFor(user: User, place: Place): boolean {
        return place.getOwner().getFriends().includes(user);
    }

}

export class GroupsPlaceVisilibity implements PlaceVisibility {

    private groups: Group[];

    public constructor(groups: Group[]) {
        this.groups = groups;
    }

    isVisibleFor(user: User, place: Place): boolean {
        var cond: boolean = false;
        this.groups.forEach(group => {
            if (group.getUsers().includes(user)) {
                cond = true;
            }

        });
        return cond;
    }
}

export class FullPlaceVisilibity implements PlaceVisibility {

    isVisibleFor(user: User, place: Place): boolean {
        return true;
    }

}