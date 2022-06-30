import express from "express";
import {
  deleteById,
  getAllUser,
  saveUser,
  updateUser,
  getUserById,
} from "../services/userService";

import validates from "../models/view-models";
import { handleValidation } from "../middlewares";
import { NotFound } from "../utils/errors";

const router = express.Router();

const getHandler = async (_, res) => {
  const users = await getAllUser();
  res.status(200).send(users);
};
const getByIdHandler = async (req, res, next) => {
  const id = req.params.id;
  try {
    const users = await getUserById(id);

    if (users) {
      res.status(200).send(users);
    } else {
      throw new NotFound("user Not Found By the id: " + id);
    }
  } catch (err) {
    return next(err, req, res);
  }
};
const postHandler = async (req, res) => {
  const body = req.body;
  const user = await saveUser(body);
  res.status(201).send(user._id);
};

const putHandler = async (req, res, next) => {
  try {
    const body = req.body;
    const user = await updateUser(body);
    res.status(200).send(user.id);
  } catch (err) {
    return next(err, req, res);
  }
};

const deleteHandler = async (req, res, next) => {
  const id = req.params.id;
  try {
    await deleteById(id);
    res.status(200).send("User Deteted");
  } catch (err) {
    console.log(err);
    return next(err, req, res);
  }
};

router.get("/", getHandler);
router.get("/:id", getByIdHandler);
router.post("/", handleValidation(validates.userSchemaValidate), postHandler);
router.put("/", putHandler);
router.delete("/:id", deleteHandler);

const configure = (app) => {
  app.use("/user", router);
};

export default configure;
