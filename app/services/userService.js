import models from "../models";
import { NotFound } from "../utils/errors";

export const saveUser = async (user) => {
  try {
    const userModel = new models.User(user);
    const saveUser = await userModel.save();
    return saveUser;
  } catch (err) {
    console.log(err);
  }
};

export const getAllUser = async () => {
  const User = models.User;
  const users = await User.find();
  return users;
};

export const updateUser = async (user) => {
  const id = user._id;
  const User = models.User;
  let model = await User.findById(id);

  if (model) {
    model.username = user.username;
    model.save();
    return model;
  }

  throw new NotFound("User not found by the id: " + id);
};

export const deleteById = async (id) => {
  const User = models.User;
  let model = await User.findById(id);
  if (model) {
    const result = await User.deleteOne({ _id: id });
    return result;
  }

  throw new NotFound("User not found by the id: " + id);
};
