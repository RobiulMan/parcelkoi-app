import express from "express";
import morgan from "morgan";

import configure from "./controllers";

import { handleError, handleRequest } from "./middlewares";

import { infoLogger } from "./logger";

import dotenv from "dotenv";
dotenv.config();
const app = express();
console.log(process.env.ENVIRONEMENT);
app.use(express.json());
app.use(handleRequest);

//terminal log checker
app.use(morgan("dev"));

//if (process.env.ENVIRONEMENT !== "TEST") app.use(infoLogger);

configure(app);
app.use(handleError);

export default app;
