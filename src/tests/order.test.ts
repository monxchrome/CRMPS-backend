import { config } from "dotenv";
import mongoose from "mongoose";
import supertest from "supertest";

import { app } from "../app";

const requestWithSupertest = supertest(app);

config();

let token: string;

beforeAll(async () => {
  const response = await requestWithSupertest
    .post("/auth/login")
    .send({ email: "admin@gmail.com", password: "admin" });

  token = response.body.accessToken;
});

describe("GET /orders", () => {
  beforeEach(async () => {
    await mongoose.connect(process.env.DB_URL);
  });

  it("should return all orders", async () => {
    const res = await requestWithSupertest
      .get("/orders")
      .set("Authorization", `${token}`);
    expect(res.statusCode).toBe(200);
  });
});

describe("GET /orders/:orderId", () => {
  it("should return an order", async () => {
    const res = await requestWithSupertest
      .get("/orders/6475f1067084b2d608166f0d")
      .set("Authorization", `${token}`);
    expect(res.statusCode).toBe(200);
  });
});

describe("PUT /orders/:orderId", () => {
  it("should update an order", async () => {
    const res = await requestWithSupertest
      .put("/orders/6475f1067084b2d608166f0d")
      .send({
        name: "Test",
        age: 44,
        sum: 2000,
      })
      .set("Authorization", `${token}`);
    expect(res.statusCode).toBe(200);
  });
});

describe("GET /comments", () => {
  it("should return all comments", async () => {
    const res = await requestWithSupertest.get("/comments");
    expect(res.statusCode).toBe(200);
  });
});

describe("POST /comments/:orderId", () => {
  it("should return post comment", async () => {
    const res = await requestWithSupertest
      .post("/comments/6475f1067084b2d608166f0d")
      .send({
        title: "Hello world test",
      })
      .set("Authorization", `${token}`);
    expect(res.statusCode).toBe(200);
  });
});

describe("GET /groups", () => {
  it("should return all groups", async () => {
    const res = await requestWithSupertest.get("/groups");
    expect(res.statusCode).toBe(200);
  });
});

describe("POST /groups/:orderId", () => {
  it("should return post group", async () => {
    const res = await requestWithSupertest
      .post("/groups/6475f1067084b2d608166f0d")
      .send({
        title: "Group test",
      })
      .set("Authorization", `${token}`);
    expect(res.statusCode).toBe(200);
  });
});
