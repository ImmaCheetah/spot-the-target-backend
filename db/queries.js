const prisma = require("./prisma");

async function getMap(mapId) {
  const map = await prisma.map.findUnique({
    where: {
      id: mapId,
    },
    include: {
      targets: true,
    },
  });

  return map;
}

async function getMaps() {
  const map = await prisma.map.findMany();

  return map;
}

async function getTarget(targetId) {
  const target = await prisma.target.findUnique({
    where: {
      id: targetId,
    },
  });

  return target;
}

async function getStartTime(scoreId) {
  const startTime = await prisma.score.findUnique({
    where: {
      id: scoreId,
    },
    select: {
      startTime: true,
    },
  });

  return startTime;
}

async function setStartTime(mapId, timestamp) {
  const startTime = await prisma.score.create({
    data: {
      startTime: timestamp,
      map: {
        connect: {
          id: mapId,
        },
      },
    },
  });

  return startTime;
}

async function submitScore(scoreId, username, finalTime) {
  const finalScore = await prisma.score.update({
    where: {
      id: scoreId,
    },
    data: {
      username: username,
      finalTime: finalTime,
    },
  });

  return finalScore;
}

async function getMapLeaderboard(mapId) {
  const leaderboard = await prisma.score.findMany({
    where: {
      mapId: mapId,
      NOT: {
        finalTime: null,
      },
    },
    select: {
      username: true,
      finalTime: true,
    },
    orderBy: {
      finalTime: "asc",
    },
  });

  return leaderboard;
}

module.exports = {
  getMap,
  getMaps,
  getTarget,
  getStartTime,
  setStartTime,
  submitScore,
  getMapLeaderboard,
};
