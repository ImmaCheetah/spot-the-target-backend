const indexRouter = require('../routes/indexRouter');
const request = require("supertest");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", indexRouter);

test("index route works", async () => {
  const response = await request(app)
    .get("/")

  expect(response.statusCode).toEqual(200)
  expect(response.body.title).toEqual('Home Page')
});
