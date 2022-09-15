/*
  Warnings:

  - You are about to drop the column `userId` on the `collections` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `collections` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "collections" DROP CONSTRAINT "collections_userId_fkey";

-- AlterTable
ALTER TABLE "collections" DROP COLUMN "userId",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "collections" ADD FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
