import request from "supertest";
import app from "../src/app";

jest.mock("../src/services/userService");

describe("Usercontroller Test Suite ", () => {
  test("get should return an array of users ", async () => {
    let response = await request(app).get("/user");
    expect(response.statusCode).toBe(200);
    let users = response.body;
    expect(users.length).toBeGreaterThan(0);
    expect(users[0].id).toBe("1");
  });

  test("post should return save id ", async () => {
    let user = { username: "test002" };
    let response = await request(app).post("/user").send(user);
    expect(response.statusCode).toBe(201);

    let body = response.body;
    expect(body.length).toBe(24);

    let saveUserResponce = await request(app).get("/user/" + body);
    let saveUser = saveUserResponce.body;

    expect(saveUser.createdAt).not.toBe(null);
    expect(saveUser.username).toBe(user.username);
  });

  test("get by id should return an user", async () => {
    let response = await request(app).get("/user/1");
    let user = response.body;
    expect(user.id).toBe("1");
  });

  test("put should update an existing user", async () => {
    let user = { id: "1", username: "test003" };
    let response = await request(app).put("/user").send(user);
    expect(response.statusCode).toBe(200);
    let updateUserResponse = await request(app).get("/user/1");
    let updateUser = updateUserResponse.body;
    expect(updateUser.username).toBe(user.username);
  });

  test("delete by id should return success message", async () => {
    let response = await request(app).delete("/user/1");
    expect(response.statusCode).toBe(200);
    let deletedUserResponce = await request(app).get("/user/1");
    expect(deletedUserResponce.statusCode).toBe(404);
    let deletedUser = deletedUserResponce.body;
    expect(deletedUser.message).toBe("user Not Found By the id: 1");
  });
});
