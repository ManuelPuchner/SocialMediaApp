/*
  Warnings:

  - The primary key for the `Like` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropIndex
DROP INDEX "Like_userId_postId_key";

-- AlterTable
ALTER TABLE "Like" DROP CONSTRAINT "Like_pkey",
ADD CONSTRAINT "Like_pkey" PRIMARY KEY ("userId", "postId");
