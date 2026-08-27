-- CreateTable
CREATE TABLE "testimonal" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "image" TEXT,
    "message" TEXT NOT NULL,

    CONSTRAINT "testimonal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "testimonal_name_key" ON "testimonal"("name");
