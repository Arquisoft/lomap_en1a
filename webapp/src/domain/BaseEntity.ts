export abstract class BaseEntity {

    public id: string;

    public constructor(id: string) {
        this.id = id;
    }

    public getId(): string {
        return this.id;
    }

    public setId(id: string) {
        this.id = id;
    }
}