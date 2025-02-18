-- DropForeignKey
ALTER TABLE "Score" DROP CONSTRAINT "Score_mapId_fkey";

-- DropForeignKey
ALTER TABLE "Target" DROP CONSTRAINT "Target_mapId_fkey";

-- AddForeignKey
ALTER TABLE "Target" ADD CONSTRAINT "Target_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Map"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Map"("id") ON DELETE CASCADE ON UPDATE CASCADE;
