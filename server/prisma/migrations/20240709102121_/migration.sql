/*
  Warnings:

  - You are about to drop the `_Followers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Followers" DROP CONSTRAINT "_Followers_A_fkey";

-- DropForeignKey
ALTER TABLE "_Followers" DROP CONSTRAINT "_Followers_B_fkey";

-- DropTable
DROP TABLE "_Followers";

-- CreateTable
CREATE TABLE "Connection" (
    "id" TEXT NOT NULL,
    "followerId" TEXT NOT NULL,
    "followingId" TEXT NOT NULL,

    CONSTRAINT "Connection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_followers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_following" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_followers_AB_unique" ON "_followers"("A", "B");

-- CreateIndex
CREATE INDEX "_followers_B_index" ON "_followers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_following_AB_unique" ON "_following"("A", "B");

-- CreateIndex
CREATE INDEX "_following_B_index" ON "_following"("B");

-- AddForeignKey
ALTER TABLE "_followers" ADD CONSTRAINT "_followers_A_fkey" FOREIGN KEY ("A") REFERENCES "Connection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_followers" ADD CONSTRAINT "_followers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_following" ADD CONSTRAINT "_following_A_fkey" FOREIGN KEY ("A") REFERENCES "Connection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_following" ADD CONSTRAINT "_following_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
