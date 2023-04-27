import { Db, MongoClient } from "mongodb";

export class DatabaseConnection {

    private static database: Db;

    public static async setDatabase(url: string) {
        let client = await MongoClient.connect(url);
        let database = client.db("Lomap");
        this.database = database;
    }

    public static async add(collectionName: string, data: any) {
        let collection = this.database.collection(collectionName);
        return collection.insertOne(data);
    }

    public static async findOne(collectionName: string, filter: any) {
        let collection = this.database.collection(collectionName);
        return collection.findOne(filter);
    }

    public static async find(collectionName: string, filter: any) {
        let collection = this.database.collection(collectionName);
        return collection.find(filter);
    }

    public static async delete(collectionName: string, filter: any) {
        let collection = this.database.collection(collectionName);
        return collection.deleteOne(filter);
    }
}