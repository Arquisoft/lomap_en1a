import { BaseEntity } from "./BaseEntity";
import { GroupVisibility } from "./Visibility";

export class Group extends BaseEntity {

    private name: string;
    private visibility: GroupVisibility;

    public constructor(id: string, name: string, visibility: GroupVisibility) {
        super(id);
        this.name = name;
        this.visibility = visibility;
    }

    public setName(name: string) {
        this.name = name;
    }

    public getName(): string {
        return this.name;
    }

    public setVisibility(visibility: GroupVisibility) {
        this.visibility = visibility;
    }

    public getVisibility(): GroupVisibility {
        return this.visibility;
    }

}