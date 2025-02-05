const prisma = require("./prisma");

async function getMap(mapId) {
  const map = await prisma.map.findUnique({
    where: {
      id: mapId
    },
    include: {
      targets: true
    }
  })

  return map;
}

async function getTarget(targetId) {
  const target = await prisma.target.findUnique({
    where: {
      id: targetId
    }
  })

  return target;
}

async function setStartTime(mapId, timestamp) {
  const startTime = await prisma.score.create({
    data: {
      startTime: timestamp,
      map: {
        connect: {
          id: mapId
        }
      }
    },

  })

  return startTime;
}

module.exports = {
  getMap,
  getTarget,
  setStartTime
}