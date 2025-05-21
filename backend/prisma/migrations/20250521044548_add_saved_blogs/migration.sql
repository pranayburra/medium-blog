-- CreateTable
CREATE TABLE "saved_blogs" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "blogId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "saved_blogs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "saved_blogs_userId_blogId_key" ON "saved_blogs"("userId", "blogId");

-- AddForeignKey
ALTER TABLE "saved_blogs" ADD CONSTRAINT "saved_blogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_blogs" ADD CONSTRAINT "saved_blogs_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "blogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
