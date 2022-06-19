import express from "express";
import morgan from "morgan";
import configure from "./controllers";
import { handleError } from "./middlewares/handleError";
import { connectionWithDb, DbUri } from "./mongo";
import winston from "winston";
import expressWinston from "express-winston";
import winstonFile from "winston-daily-rotate-file";
import winstonMongo from "winston-mongodb";
import { ElasticsearchTransport } from "winston-elasticsearch";

const app = express();
configure(app);
app.use(express.json());

const processRequest = async (req, res, next) => {
  let correlationId = req.headers["x-correlation-id"];
  if (!correlationId) {
    correlationId = Date.now().toString();
    req.headers["x-correlation-id"] = correlationId;
  }

  res.set("x-correlation-id", correlationId);

  return next();
};

app.use(processRequest);

//terminal log checker
app.use(morgan("dev"));

//DataBase Connnection
connectionWithDb();

const getMessage = (req, res) => {
  let obj = {
    correlationId: req.headers["x-correlation-id"],
    requestBody: req.body,
  };

  return JSON.stringify(obj);
};

const fileInfoTransport = new winston.transports.DailyRotateFile({
  filename: "log-info-%DATE%.log",
  datePattern: "yyyy-mm-DD-HH",
});

const fileErrrorTransport = new winston.transports.DailyRotateFile({
  filename: "log-error-%DATE%.log",
  datePattern: "yyyy-mm-DD-HH",
});
const mongoErrorTransport = new winston.transports.MongoDB({
  db: DbUri,
  metaKey: "meta",
});
const elasticsearchOptions = {
  level: "info",
  clientOpts: { node: "http://localhost:9200" },
  indexPrefix: "log-parcelkoi",
};
const esTransport = new ElasticsearchTransport(elasticsearchOptions);
const infoLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console(),
    fileInfoTransport,
    esTransport,
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  meta: true,
  msg: getMessage,
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.Console(),
    fileErrrorTransport,
    mongoErrorTransport,
    esTransport,
  ],
});

app.use(infoLogger);
configure(app);

app.use(errorLogger);
app.use(handleError);

export default app;
