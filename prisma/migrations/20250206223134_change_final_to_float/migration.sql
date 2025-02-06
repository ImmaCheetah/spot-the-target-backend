/*
  Warnings:

  - The `finalTime` column on the `Score` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Score" DROP COLUMN "finalTime",
ADD COLUMN     "finalTime" DOUBLE PRECISION;
