const indexRouter = require('../routes/indexRouter');
const mapRouter = require('../routes/mapRouter');
const request = require("supertest");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", indexRouter);
app.use('/map', mapRouter);


test("index route works", async () => {
  const response = await request(app)
    .get("/")

  expect(response.statusCode).toEqual(200)
  expect(response.body.title).toEqual('Home Page')
});


describe("Map routes", () => {
  test("returns status code 200 and correct map name", async () => {
    const response = await request(app)
    .get("/map/2")

    expect(response.statusCode).toEqual(200)
    expect(response.body.map.name).toEqual('Prehistoric')
  })
})