import express, { Application, RequestHandler } from "express";
import bp from "body-parser";
import promBundle from "express-prom-bundle";
import api from "./api";
import { DatabaseConnection } from "./src/repositories/DatabaseConnection";
import { readFileSync } from "fs";
import { createServer } from "https";

const app: Application = express();
const portHttp: number = 5080;
const portHttps: number = 5443;

const hostName = process.env.DOMAIN || "localhost";

app.all('*', function(req, res, next){
  if (req.secure) {
      return next();
  }
  res.redirect('https://'+ hostName + ":" + portHttps + req.url);
});

const metricsMiddleware: RequestHandler = promBundle({ includeMethod: true });
app.use(metricsMiddleware);

//Load certificates
let privateKey = readFileSync("certificates/host.key");
let certificate = readFileSync("certificates/host.cert");
let credentials = { key: privateKey, cert: certificate };

try {
    privateKey = readFileSync("certificates/privkey.pem");
    certificate = readFileSync("certificates/fullchain.pem");
    credentials = { key: privateKey, cert: certificate };
} catch (e) { console.log("Error loading certificates: " + e.message); }

app.use(bp.json());

app.use("/api", api);
DatabaseConnection.setDatabase(
  "mongodb+srv://admin:admin@lomap.aux4co1.mongodb.net/?retryWrites=true&w=majority" as string
);

app
  .listen(portHttp, (): void => {
    console.log("Restapi listening on " + portHttp);
  })
  .on("error", (error: Error) => {
    console.error("Error occured: " + error.message);
  });

createServer(credentials, app)
  .listen(portHttps, (): void => {
    console.log("Restapi listening on " + portHttps);
  })
  .on("error", (error: Error) => {
    console.error("Error occured: " + error.message);
  });
