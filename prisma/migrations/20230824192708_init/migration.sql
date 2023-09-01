/*
  Warnings:

  - You are about to drop the `TickePhoto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TickePhoto" DROP CONSTRAINT "TickePhoto_ticket_id_fkey";

-- DropTable
DROP TABLE "TickePhoto";

-- CreateTable
CREATE TABLE "ticket_photo" (
    "photo_id" SERIAL NOT NULL,
    "ticket_id" INTEGER NOT NULL,
    "filename" TEXT NOT NULL,

    CONSTRAINT "ticket_photo_pkey" PRIMARY KEY ("photo_id")
);

-- AddForeignKey
ALTER TABLE "ticket_photo" ADD CONSTRAINT "ticket_photo_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "ticket"("ticket_id") ON DELETE RESTRICT ON UPDATE CASCADE;
