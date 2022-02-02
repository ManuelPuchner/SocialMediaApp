/*
  Warnings:

  - You are about to drop the column `postid` on the `Comment` table. All the data in the column will be lost.
  - Added the required column `postId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "postid",
ADD COLUMN     "postId" INTEGER NOT NULL;
