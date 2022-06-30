import request from "supertest";
import app from "../src/app";

jest.mock("../src/services/userService");
describe("app test suite ", () => {
  test("my first test", async () => {
    console.log("my first test");
  });

  test("app first test ", async () => {
    let response = await request(app).get("/user");
    expect(response.statusCode).toBe(200);
    let users = response.body;
    expect(users.length).toBe(1);
  });
});
