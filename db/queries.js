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


module.exports = {
  getMap,
  getTarget,
}