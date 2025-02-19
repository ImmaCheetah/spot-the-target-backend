const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const maps = await prisma.map.createMany({
    data: [
      {
        id: "1",
        name: "Carnisol",
      },
      {
        id: "2",
        name: "Prehistoric",
      },
      {
        id: "3",
        name: "Medieval",
      },
    ],
  });

  const targets = await prisma.target.createMany({
    data: [
      {
        id: "1",
        name: "Batman",
        coordinates: { x: 100, y: 100 },
        mapId: "1",
      },
      {
        id: "2",
        name: "Bone",
        coordinates: { x: 200, y: 200 },
        mapId: "2",
      },
      {
        id: "3",
        name: "Knight",
        coordinates: { x: 300, y: 300 },
        mapId: "3",
      },
    ],
  });
  console.log({ maps, targets });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
