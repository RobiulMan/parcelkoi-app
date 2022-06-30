import app from "./app";
import { connectionWithDb, DbUri } from "./mongo";
import { infoLogger, errorLogger } from "./logger";

const port = 4010;
app.listen(port, () => {
  //DataBase Connnection
  connectionWithDb();

  if (process.env.ENVIRONEMENT !== "TEST") app.use(errorLogger(DbUri));

  console.log("Listening to port");
});
