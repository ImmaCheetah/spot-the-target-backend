const prisma = require("./prisma");

async function getTarget(targetId) {
  const target = await prisma.target.findUnique({
    where: {
      id: targetId
    }
  })

  return target;
}

module.exports = {
  getTarget
}