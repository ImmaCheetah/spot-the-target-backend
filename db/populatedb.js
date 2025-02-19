const { v4: uuidv4 } = require('uuid');
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  
  const targets = await prisma.target.createMany({
    data: [
      {
        id: uuidv4(),
        name: "Knight",
        coordinates: { x: 1158, y: 818 },
        mapId: "b2d1cf99-1068-4259-98d6-06e0eebb178b",
      },
      {
        id: uuidv4(),
        name: "Lionel",
        coordinates: { x: 630, y: 512 },
        mapId: "b2d1cf99-1068-4259-98d6-06e0eebb178b",
      },
      {
        id: uuidv4(),
        name: "Dovahkiin",
        coordinates: { x: 454, y: 742 },
        mapId: "b2d1cf99-1068-4259-98d6-06e0eebb178b",
      },
      {
        id: uuidv4(),
        name: "Bone",
        coordinates: { x: 219, y: 470 },
        mapId: "b6c623b5-5778-40a9-959a-c2800877b96b",
      },
      {
        id: uuidv4(),
        name: "Diego",
        coordinates: { x: 473, y: 803 },
        mapId: "b6c623b5-5778-40a9-959a-c2800877b96b",
      },
      {
        id: uuidv4(),
        name: "Knife Man",
        coordinates: { x: 697, y: 363 },
        mapId: "b6c623b5-5778-40a9-959a-c2800877b96b",
      },
      {
        id: uuidv4(),
        name: "Dolphin",
        coordinates: { x: 849, y: 753 },
        mapId: "e856e9ab-d110-4456-96eb-ccfe54176954",
      },
      {
        id: uuidv4(),
        name: "Batman",
        coordinates: { x: 291, y: 480 },
        mapId: "e856e9ab-d110-4456-96eb-ccfe54176954",
      },
      {
        id: uuidv4(),
        name: "Bear",
        coordinates: { x: 449, y: 267 },
        mapId: "e856e9ab-d110-4456-96eb-ccfe54176954",
      },
    ],
  });
  console.log({ targets });
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
