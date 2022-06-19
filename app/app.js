import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import configure from "./controllers";

import { infoLogger, errorLogger } from "./logger";
import { handleError, handleRequest } from "./middlewares";

import { connectionWithDb, DbUri } from "./mongo";
dotenv.config();
const app = express();
console.log(process.env.ENVIRONEMENT);
app.use(express.json());
app.use(handleRequest);

//terminal log checker
app.use(morgan("dev"));

//DataBase Connnection
connectionWithDb();

if (process.env.ENVIRONEMENT != "TEST") {
  app.use(infoLogger);
}
configure(app);

if (process.env.ENVIRONEMENT != "TEST") {
  app.use(errorLogger(DbUri));
}
app.use(handleError);

export default app;
