import express, { Application, RequestHandler } from "express";
import cors from 'cors';
import bp from 'body-parser';
import promBundle from 'express-prom-bundle';
import api from "./api";
import { DatabaseConnection } from "./src/repositories/DatabaseConnection";

const app: Application = express();
const port: number = 5000;

const metricsMiddleware: RequestHandler = promBundle({ includeMethod: true });
app.use(metricsMiddleware);

api.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000',
        allowedHeaders: ['Content-Type', 'Authorization'],
        preflightContinue: true
    }),
);

app.use(bp.json());

app.use("/api", api)
DatabaseConnection.setDatabase("mongodb+srv://admin:admin@lomap.aux4co1.mongodb.net/?retryWrites=true&w=majority" as string);


app.listen(port, (): void => {
    console.log('Restapi listening on ' + port);
}).on("error", (error: Error) => {
    console.error('Error occured: ' + error.message);
});

