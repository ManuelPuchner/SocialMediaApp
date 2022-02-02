-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_authorName_fkey" FOREIGN KEY ("authorName") REFERENCES "User"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
