/*
  Warnings:

  - You are about to drop the column `followingId` on the `Connection` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Connection` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Connection" DROP CONSTRAINT "Connection_followingId_fkey";

-- AlterTable
ALTER TABLE "Connection" DROP COLUMN "followingId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
