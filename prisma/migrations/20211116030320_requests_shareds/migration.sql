/*
  Warnings:

  - You are about to drop the `notifications` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_sender_id_fkey";

-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_totymId_fkey";

-- DropTable
DROP TABLE "notifications";

-- CreateTable
CREATE TABLE "requests_shareds" (
    "id" SERIAL NOT NULL,
    "read" BOOLEAN NOT NULL,
    "user_id" INTEGER NOT NULL,
    "sender_id" INTEGER NOT NULL,
    "totymId" INTEGER,
    "totymTitle" TEXT,
    "type" "NotificationType" NOT NULL DEFAULT E'REQUEST',
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "requests_shareds" ADD FOREIGN KEY ("sender_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requests_shareds" ADD FOREIGN KEY ("totymId") REFERENCES "Totym"("id") ON DELETE SET NULL ON UPDATE CASCADE;
