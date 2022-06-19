import mongoose from "mongoose";
export const DbUri = "mongodb://localhost:27017/parcelkoi";
const options = {};

const log = (msg) => console.log(msg);
export const connectionWithDb = () => {
  mongoose.connect(DbUri, options, (err, db) => {
    if (err) {
      throw err;
    }
  });
};
