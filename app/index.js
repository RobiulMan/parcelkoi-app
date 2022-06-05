import express from "express";
import morgan from "morgan";
import configure from "./controllers";
import { handleError } from "./middlewares/handleError";
import connectionWithDb from "./mongo";
const port = 4010;
const app = express();
configure;
app.use(express.json());
app.use(morgan("dev"));

connectionWithDb();

configure(app);

app.use(handleError);
app.listen(port, () => {
  console.log("Listening to port");
});
