/*
  Warnings:

  - You are about to drop the column `Image` on the `articles` table. All the data in the column will be lost.
  - You are about to drop the column `Message` on the `articles` table. All the data in the column will be lost.
  - Added the required column `message` to the `articles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "articles" DROP COLUMN "Image",
DROP COLUMN "Message",
ADD COLUMN     "image" TEXT,
ADD COLUMN     "message" TEXT NOT NULL;
