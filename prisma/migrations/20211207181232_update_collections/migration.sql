/*
  Warnings:

  - You are about to drop the column `collectionId` on the `Totym` table. All the data in the column will be lost.
  - Added the required column `totymId` to the `collections` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Totym" DROP CONSTRAINT "Totym_collectionId_fkey";

-- AlterTable
ALTER TABLE "Totym" DROP COLUMN "collectionId";

-- AlterTable
ALTER TABLE "collections" ADD COLUMN     "totymId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "collections" ADD FOREIGN KEY ("totymId") REFERENCES "Totym"("id") ON DELETE CASCADE ON UPDATE CASCADE;
