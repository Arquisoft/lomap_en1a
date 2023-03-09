import express, { Application, RequestHandler } from "express";
import cors from 'cors';
import bp from 'body-parser';
import promBundle from 'express-prom-bundle';
import app from "./podApi/podApi"; 


// Cookies for the SOLID session
// npm install cookie-session
const cookieSession = require("cookie-session");

const myapp: Application = express();
const port: number = 5000;

const metricsMiddleware:RequestHandler = promBundle({includeMethod: true});
myapp.use(metricsMiddleware);

myapp.use(cors());
myapp.use(bp.json());

myapp.use("/", app)
myapp.use(cookieSession({
    name: "session",
    // These keys are required by cookie-session to sign the cookies.
    keys: [
      "Required, but value not relevant for this demo - key1",
      "Required, but value not relevant for this demo - key2",
    ],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  }));

myapp.listen(port, ():void => {
    console.log('Restapi listening on '+ port);
}).on("error",(error:Error)=>{
    console.error('Error occured: ' + error.message);
});

