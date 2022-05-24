import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import models from "./models/index.js";

const port = 4010;
const app = express();

app.use(express.json());
app.use(morgan("dev"));

const log = (msg) => console.log(msg);

const uri = "mongodb://localhost:27017/parcelkoi";
const options = {};
const connectionWithDb = () => {
  mongoose.connect(uri, options, (err, db) => {
    if (err) {
      console.log(err);
    } else log("database connection established");
  });
};
connectionWithDb();

app.get("/", (req, res) => {
  res.send("Hello viewers" + req.query.id);
});

app.post("/", async (req, res) => {
  const body = req.body;
  const user = new models.User({
    username: body.username,
    createdAt: new Date(),
  });
  await user.save();
  res.status(201).send("User saved id: " + user._id);
});
app.listen(port, () => {
  console.log("Listening to port");
});

log(models);
