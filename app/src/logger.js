import winston from "winston";
import expressWinston from "express-winston";
import winstonFile from "winston-daily-rotate-file";
import winstonMongo from "winston-mongodb";
import { ElasticsearchTransport } from "winston-elasticsearch";

const getMessage = (req, res) => {
  let obj = {
    correlationId: req.headers["x-correlation-id"],
    requestBody: req.body,
  };

  return JSON.stringify(obj);
};

//const fileInfoTransport = new winston.transports.DailyRotateFile({
//filename: "log-info-%DATE%.log",
//datePattern: "yyyy-mm-DD-HH",
//});

//const fileErrrorTransport = new winston.transports.DailyRotateFile({
//filename: "log-error-%DATE%.log",
//datePattern: "yyyy-mm-DD-HH",
//});
const mongoErrorTransport = (uri) =>
  new winston.transports.MongoDB({
    db: uri,
    options: { useUnifiedTopology: true },
    metaKey: "meta",
  });
//const elasticsearchOptions = {
//level: "info",
//clientOpts: { node: "http://localhost:9200" },
//indexPrefix: "log-parcelkoi",
//};
//const esTransport = new ElasticsearchTransport(elasticsearchOptions);

export const infoLogger = () => console.log("running inforlooger");
expressWinston.logger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.DailyRotateFile({
      filename: "log-info-%DATE%.log",
      datePattern: "yyyy-mm-DD-HH",
    }),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  meta: true,
  msg: getMessage,
});

export const errorLogger = (uri) =>
  expressWinston.errorLogger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.DailyRotateFile({
        filename: "log-error-%DATE%.log",
        datePattern: "yyyy-mm-DD-HH",
      }),
      mongoErrorTransport(uri),
    ],
  });
