/*
  Warnings:

  - You are about to drop the `_Following` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Following" DROP CONSTRAINT "_Following_A_fkey";

-- DropForeignKey
ALTER TABLE "_Following" DROP CONSTRAINT "_Following_B_fkey";

-- DropTable
DROP TABLE "_Following";
