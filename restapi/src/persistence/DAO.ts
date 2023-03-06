module.exports = 
interface DAO<T> {

    getTbyId(id: String): T;
    save(entity: T): void;
    remove(entity: T): void;
    update(entity: T): void;


}