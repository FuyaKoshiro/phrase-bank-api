/*
  Warnings:

  - You are about to drop the column `idFromYoutube` on the `Video` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Video_idFromYoutube_key";

-- AlterTable
ALTER TABLE "Video" DROP COLUMN "idFromYoutube";
