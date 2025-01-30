const prisma = require("./prisma");

async function getMap(mapId) {
  const map = await prisma.map.findUnique({
    where: {
      id: mapId
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

async function setIsFound(targetId) {
  const target = await prisma.target.update({
    where: {
      id: targetId
    },
    data: {
      isFound: true
    }
  })

  return target;
}

module.exports = {
  getMap,
  getTarget,
  setIsFound,
}