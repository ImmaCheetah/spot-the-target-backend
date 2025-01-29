const prisma = require("./prisma");

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
  getTarget,
  setIsFound
}