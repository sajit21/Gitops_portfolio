/*
  Warnings:

  - You are about to drop the `testimonal` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."testimonal";

-- CreateTable
CREATE TABLE "testimonals" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "image" TEXT,
    "message" TEXT NOT NULL,

    CONSTRAINT "testimonals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "testimonals_name_key" ON "testimonals"("name");
