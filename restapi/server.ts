import express, { Application, RequestHandler } from "express";
import cors from "cors";
import bp from "body-parser";
import promBundle from "express-prom-bundle";
import api from "./api";
import { DatabaseConnection } from "./src/repositories/DatabaseConnection";
import { readFileSync } from "fs";
import { createServer } from "https";

const app: Application = express();
const port: number = 5000;

const metricsMiddleware: RequestHandler = promBundle({ includeMethod: true });
app.use(metricsMiddleware);

let host = process.env.host || "localhost";
api.use(
  cors({
    credentials: true,
    origin: "http://" + host + ":3000",
    allowedHeaders: ["Content-Type", "Authorization"],
    preflightContinue: true,
  })
);

var privateKey = readFileSync("certificates/host.key");
var certificate = readFileSync("certificates/host.cert");
var credentials = { key: privateKey, cert: certificate };

app.all("*", function (req, res, next) {
  if (req.secure) {
    return next();
  }
  console.log("redirecting to https");
  res.redirect("https://" + req.hostname + req.url);
});

app.use(bp.json());

app.use("/api", api);
DatabaseConnection.setDatabase(
  "mongodb+srv://admin:admin@lomap.aux4co1.mongodb.net/?retryWrites=true&w=majority" as string
);

app.use(
  cors({
    credentials: true,
    origin: "http://" + host + ":3000",
    allowedHeaders: ["Content-Type", "Authorization"],
    preflightContinue: true,
  })
);

// app
//   .listen(port, (): void => {
//     console.log("Restapi listening on " + port);
//   })
//   .on("error", (error: Error) => {
//     console.error("Error occured: " + error.message);
//   });

createServer(credentials, app)
  .listen(port, (): void => {
    console.log("Restapi listening on " + port);
  })
  .on("error", (error: Error) => {
    console.error("Error occured: " + error.message);
  });
