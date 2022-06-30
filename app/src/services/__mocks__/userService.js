import models from "../../models";
let users = [
  {
    id: "1",
    username: "test001",
  },
];
export const getAllUser = async () => {
  return users;
};

export const getUserById = async (id) => {
  const user = users.find((x) => x.id === id);
  return user;
};

export const saveUser = async (user) => {
  try {
    const model = new models.User(user);
    users.push(model);
    return model;
  } catch (err) {
    console.log(err);
  }
};

export const updateUser = async (user) => {
  users[0].username = user.username;
  return users[0];
};

export const deleteById = async (id) => {
  users = [];
};
