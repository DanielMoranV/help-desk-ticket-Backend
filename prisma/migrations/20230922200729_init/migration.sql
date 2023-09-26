-- DropForeignKey
ALTER TABLE "ticket_comment" DROP CONSTRAINT "ticket_comment_ticket_id_fkey";

-- DropForeignKey
ALTER TABLE "ticket_photo" DROP CONSTRAINT "ticket_photo_ticket_id_fkey";

-- AddForeignKey
ALTER TABLE "ticket_photo" ADD CONSTRAINT "ticket_photo_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "ticket"("ticket_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_comment" ADD CONSTRAINT "ticket_comment_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "ticket"("ticket_id") ON DELETE CASCADE ON UPDATE CASCADE;
