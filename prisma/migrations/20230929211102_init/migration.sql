-- AlterTable
ALTER TABLE "ticket_comment" ADD COLUMN     "ticket_billing_id" INTEGER,
ALTER COLUMN "ticket_id" DROP NOT NULL;

-- CreateTable
CREATE TABLE "ticket_billing" (
    "ticket_billing_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "agent_id" INTEGER,
    "category_billing_id" INTEGER NOT NULL,
    "priority_id" INTEGER NOT NULL,
    "subject" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pendiente',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "resolved_at" TIMESTAMP(3),
    "closed_at" TIMESTAMP(3),

    CONSTRAINT "ticket_billing_pkey" PRIMARY KEY ("ticket_billing_id")
);

-- CreateTable
CREATE TABLE "ticket_photo_billing" (
    "photo_billing_id" SERIAL NOT NULL,
    "ticket_billing_id" INTEGER NOT NULL,
    "filename" TEXT NOT NULL,

    CONSTRAINT "ticket_photo_billing_pkey" PRIMARY KEY ("photo_billing_id")
);

-- CreateTable
CREATE TABLE "category_billing" (
    "category_billing_id" SERIAL NOT NULL,
    "name_Billing" TEXT NOT NULL,

    CONSTRAINT "category_billing_pkey" PRIMARY KEY ("category_billing_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "category_billing_name_Billing_key" ON "category_billing"("name_Billing");

-- AddForeignKey
ALTER TABLE "ticket_billing" ADD CONSTRAINT "ticket_billing_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_billing" ADD CONSTRAINT "ticket_billing_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "access"("access_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_billing" ADD CONSTRAINT "ticket_billing_category_billing_id_fkey" FOREIGN KEY ("category_billing_id") REFERENCES "category_billing"("category_billing_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_billing" ADD CONSTRAINT "ticket_billing_priority_id_fkey" FOREIGN KEY ("priority_id") REFERENCES "priority"("priority_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_photo_billing" ADD CONSTRAINT "ticket_photo_billing_ticket_billing_id_fkey" FOREIGN KEY ("ticket_billing_id") REFERENCES "ticket_billing"("ticket_billing_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_comment" ADD CONSTRAINT "ticket_comment_ticket_billing_id_fkey" FOREIGN KEY ("ticket_billing_id") REFERENCES "ticket_billing"("ticket_billing_id") ON DELETE CASCADE ON UPDATE CASCADE;
