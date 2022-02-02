/*
  Warnings:

  - A unique constraint covering the columns `[userId,postId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Like_postId_key";

-- DropIndex
DROP INDEX "Like_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "user_post_unique" ON "Like"("userId", "postId");
