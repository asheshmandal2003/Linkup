-- DropForeignKey
ALTER TABLE "Connection" DROP CONSTRAINT "Connection_followerId_fkey";

-- DropForeignKey
ALTER TABLE "Connection" DROP CONSTRAINT "Connection_userId_fkey";

-- AddForeignKey
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
