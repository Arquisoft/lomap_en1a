export class MySql {


    private static instance: MySql;

    public static getInstance() {
        if (!MySql.instance) {
            MySql.instance = new MySql();
        }

        return MySql.instance;
    }

    mysql = require('mysql');
    con = this.mysql.createConnection({
        //For docker
        /*
        host: "mariadb",
        user: "root",
        password: "admin"
        */
        //For xampp
        host: "localhost",
        user: "SA",
        password: ""
    });


    private constructor() {
        this.connect();
        this.con.query("USE LOMAP");
    }


    connect() {


        this.con.connect(function (err: any) {
            if (err) {
                throw err;
            }
        });





        //OPERACION GET



    }



    createDB() {
        this.con.query("CREATE DATABASE LOMAP;", function (err: any, result: any) {
            if (err) {
                console.log("Database ALREADY created");
            }
            else {
                console.log("NEW Database created");
            }
        });
        this.query("CREATE TABLE USER(USER_ID VARCHAR(255))");




    }

    query(sql: string) {
        this.con.query(sql + ";", function (err: any, result: any) {
            if (err) {
                console.log("ERROR");
                throw err;
            }
            else {
            }
        });
    }

    get(table: string, where: string) {

        return new Promise((resolve, reject) => {
            this.con.query(
                "SELECT * FROM " + table + " " + where,
                (err: any, result: unknown) => {
                    return err ? reject(err) : resolve(result);
                }
            );
        });
    }



    insertSample() {
        this.query("INSERT INTO USER (USER_ID) VALUES ('A1')");
        this.query("INSERT INTO USER (USER_ID) VALUES ('A2')");
        this.query("INSERT INTO USER (USER_ID) VALUES ('A3')");
        this.query("INSERT INTO USER (USER_ID) VALUES ('B1')");
        this.query("INSERT INTO USER (USER_ID) VALUES ('B2')");
        this.query("INSERT INTO USER (USER_ID) VALUES ('B3')");
        this.query("INSERT INTO USER (USER_ID) VALUES ('C1')");
        this.query("INSERT INTO USER (USER_ID) VALUES ('C2')");
        this.query("INSERT INTO USER (USER_ID) VALUES ('C3')");
    }
}
