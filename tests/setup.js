const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require("express");
const app = express();

let port = 3000

const server = app.listen(port, () => console.log(`Listening on port ${port}`))

module.exports = {
  server, prisma
}