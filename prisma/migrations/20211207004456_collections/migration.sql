-- AlterTable
ALTER TABLE "Totym" ADD COLUMN     "collectionId" INTEGER;

-- CreateTable
CREATE TABLE "collections" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "collections" ADD FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Totym" ADD FOREIGN KEY ("collectionId") REFERENCES "collections"("id") ON DELETE SET NULL ON UPDATE CASCADE;
