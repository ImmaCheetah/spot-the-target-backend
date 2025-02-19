const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const indexRouter = require('../routes/indexRouter');
const mapRouter = require('../routes/mapRouter');
const leaderboardRouter = require('../routes/leaderboardRouter');
const request = require("supertest");
const express = require("express");
const app = express();

beforeAll( async() => {
  const maps = await prisma.map.createMany({
    data: [
      {
        id: '1',
        name: 'Carnisol',
      },
      {
        id: '2',
        name: 'Prehistoric',
      },
      {
        id: '3',
        name: 'Medieval',
      }
    ]   
  })

  const targets = await prisma.target.createMany({
    data: [
      {
        id: '1',
        name: 'Batman',
        coordinates: {x: 100, y: 100},
        mapId: '1',
      },
      {
        id: '2',
        name: 'Bone',
        coordinates: {x: 200, y: 200},
        mapId: '2'
      },
      {
        id: '3',
        name: 'Knight',
        coordinates: {x: 300, y: 300},
        mapId: '3',

      }
    ]
  })
})

afterAll(async () => {
  await prisma.target.deleteMany()
  await prisma.score.deleteMany()
  await prisma.map.deleteMany()
})

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", indexRouter);
app.use('/map', mapRouter);
app.use('/leaderboard', leaderboardRouter);

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

  test("returns status code 404 on bad route", async () => {
    const response = await request(app)
    .get("/map/bad")

    expect(response.statusCode).toEqual(404)
  })

  test("successfully verifies targets with coordinates", async () => {
    const response = await request(app)
    .post("/map/1/target/1")
    .send({id: '1', x: 100, y: 100})

    const response2 = await request(app)
    .post("/map/2/target/2")
    .send({id: '2', x: 200, y: 200})
  
    expect(response.statusCode).toEqual(200)
    expect(response.body.isFound).toEqual(true)

    expect(response2.statusCode).toEqual(200)
    expect(response2.body.isFound).toEqual(true)
  })

  test("creates start time on map load", async () => {
    const response = await request(app)
    .post("/map/1")

    expect(Date.now() - response.body.startTime.startTime).toBeLessThan(10)
  })
})


describe("Leaderboard routes", () => {
  test("returns status 200 when getting leaderboard", async () => {
    const response = await request(app)
    .get("/leaderboard/map/2")

    expect(response.statusCode).toEqual(200)
  })

  test("returns correct start time", async () => {
    const startId = await prisma.score.create({
      data: {
        startTime: 1739977350361,
        mapId: '1'
      },
      select: {
        id: true
      }
    })

    const response = await request(app)
    .get(`/leaderboard/${startId.id}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.startTime.startTime).toEqual(1739977350361)
  })

  test("returns 404 status if wrong route", async () => {   
    const response = await request(app)
    .get(`/leaderboard/wrong`)

    expect(response.statusCode).toEqual(404)
  })

  test("successfully records final time and name", async () => {
    const startId = await prisma.score.create({
      data: {
        startTime: Date.now(),
        mapId: '1'
      },
      select: {
        id: true
      }
    })

    
    const response = await request(app)
    .patch(`/leaderboard/${startId.id}`)
    .send({name: 'Dave', finishedTime: 1739977354000})

    expect(response.statusCode).toEqual(200)
    expect(response.body.finalScore.username).toEqual('Dave')
    expect(response.body.finalScore.finalTime).toEqual(1739977354000)
  })

  test("throws error with invalid name", async () => {
    const startId = await prisma.score.create({
      data: {
        startTime: Date.now(),
        mapId: '1'
      },
      select: {
        id: true
      }
    })

    const response = await request(app)
    .patch(`/leaderboard/${startId.id}`)
    .send({name: '%$!', finishedTime: 1739977354000})

    expect(response.statusCode).toEqual(400)
    expect(response.body.errors[0].msg).toEqual('Username must contain only letters and numbers')
  })
})