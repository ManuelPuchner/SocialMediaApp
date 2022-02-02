-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "likeCount" INTEGER NOT NULL DEFAULT 0;

-- RenameIndex
ALTER INDEX "user_post_unique" RENAME TO "Like_userId_postId_key";
