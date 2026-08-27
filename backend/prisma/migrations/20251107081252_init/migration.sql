/*
  Warnings:

  - Made the column `link` on table `publication` required. This step will fail if there are existing NULL values in that column.
  - Made the column `link` on table `videos` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "publication" ALTER COLUMN "link" SET NOT NULL;

-- AlterTable
ALTER TABLE "videos" ALTER COLUMN "link" SET NOT NULL;
