import { User } from "./User";

export class Group {

    private name: string;
    //private visibility: GroupVisibility;

    users: User[] = [];

    public constructor(name: string/*, visibility: GroupVisibility*/) {
        this.name = name;
        //this.visibility = visibility;
    }

    public setName(name: string) {
        this.name = name;
    }

    public getName(): string {
        return this.name;
    }

    // public setVisibility(visibility: GroupVisibility) {
    //     this.visibility = visibility;
    // }

    // public getVisibility(): GroupVisibility {
    //     return this.visibility;
    // }

    public join(user: User) {
        this.users.push(user);
    }

    public getUsers(): User[] {
        return [... this.users];
    }

}