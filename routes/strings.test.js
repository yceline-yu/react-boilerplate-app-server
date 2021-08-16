"use strict";

const request = require("supertest");
const app = require("../app");

/** GET /strings - get stringlist => { strings } */

describe("GET /", function () {
  test("valid", async function () {
    const resp = await request(app).get("/strings");

    expect(resp.body).toEqual({strings: expect.any(Array)});
  });

});

/** POST /strings - send new string info => {"added": string } */

describe("POST /", function () {
  test("valid", async function () {
    const resp = await request(app).post("/strings").send({
      string: "test1",
    });

    expect(resp.body).toEqual({ added: "test1" });
  });

  test("invalid-missing values", async function () {
    const resp = await request(app).post("/strings").send({
      string: null,
    });

    expect(resp.statusCode).toEqual(400);
  });

});
