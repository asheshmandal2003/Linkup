/*
  Warnings:

  - You are about to drop the `_followers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_following` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_followers" DROP CONSTRAINT "_followers_A_fkey";

-- DropForeignKey
ALTER TABLE "_followers" DROP CONSTRAINT "_followers_B_fkey";

-- DropForeignKey
ALTER TABLE "_following" DROP CONSTRAINT "_following_A_fkey";

-- DropForeignKey
ALTER TABLE "_following" DROP CONSTRAINT "_following_B_fkey";

-- DropTable
DROP TABLE "_followers";

-- DropTable
DROP TABLE "_following";

-- AddForeignKey
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
