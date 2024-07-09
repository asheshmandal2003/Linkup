-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "private" BOOLEAN NOT NULL DEFAULT true;
