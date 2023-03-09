import { Console } from "console";

// import { MySql } from "./MySql";
var a = require('./MySql.ts');


function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


a.connect();
a.query("USE LOMAP");


const main = async () => {
    var res;
    await a.get("USER", "").then((result: any) => res = result);

    console.log(res);
}

main();
