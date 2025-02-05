/*
  Warnings:

  - You are about to drop the column `userId` on the `Score` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Score" DROP CONSTRAINT "Score_userId_fkey";

-- AlterTable
ALTER TABLE "Score" DROP COLUMN "userId",
ADD COLUMN     "username" TEXT NOT NULL DEFAULT 'Anonymous';

-- DropTable
DROP TABLE "User";
