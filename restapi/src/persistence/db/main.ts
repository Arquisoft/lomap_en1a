import { Console } from "console";

// import { MySql } from "./MySql";
var a = require('./MySql.ts');


function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


a.connect();
a.query("USE LOMAP");
var res;
(async () => await a.get("USER", ""))().then((result) => res = result)
delay(20000000);

console.log(res);