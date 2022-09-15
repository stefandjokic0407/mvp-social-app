/*
  Warnings:

  - You are about to drop the column `read` on the `requests_shareds` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `requests_shareds` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "requests_shareds" DROP COLUMN "read",
DROP COLUMN "user_id";

-- CreateTable
CREATE TABLE "requests_shareds_users" (
    "id" SERIAL NOT NULL,
    "read" BOOLEAN NOT NULL,
    "userId" INTEGER NOT NULL,
    "notificationId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "requests_shareds_users" ADD FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requests_shareds_users" ADD FOREIGN KEY ("notificationId") REFERENCES "requests_shareds"("id") ON DELETE CASCADE ON UPDATE CASCADE;
