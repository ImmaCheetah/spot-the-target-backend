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

async function getStartTime(scoreId) {
  const startTime = await prisma.score.findUnique({
    where: {
      id: scoreId
    },
    select: {
      startTime: true
    }
  })

  return startTime;
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

async function submitScore(scoreId, username, finalTime) {
  const finalScore = await prisma.score.update({
    where: {
      id: scoreId
    },
    data: {
      username: username,
      finalTime: finalTime,
    },
  })

  return finalScore;
}

module.exports = {
  getMap,
  getTarget,
  getStartTime,
  setStartTime,
  submitScore
}