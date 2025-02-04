/*
  Warnings:

  - You are about to drop the column `endTime` on the `Map` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Map` table. All the data in the column will be lost.
  - You are about to drop the column `isFound` on the `Target` table. All the data in the column will be lost.
  - You are about to drop the column `finalTime` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Map" DROP COLUMN "endTime",
DROP COLUMN "startTime";

-- AlterTable
ALTER TABLE "Target" DROP COLUMN "isFound";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "finalTime";

-- CreateTable
CREATE TABLE "Score" (
    "id" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "finalTime" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "mapId" TEXT NOT NULL,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Map"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
