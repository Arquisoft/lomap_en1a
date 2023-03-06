import { Console } from "console";

// import { MySql } from "./MySql";
var a = require('./MySql.ts');





a.connect();
a.query("USE LOMAP");
