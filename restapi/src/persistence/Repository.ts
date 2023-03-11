export interface Repository<T> {

    get(id: String): T;
    remove(id: String): void;
    insert(entity: T): void;
    update(entity: T): void;

}