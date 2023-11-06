-- CreateTable
CREATE TABLE "user" (
    "user_id" SERIAL NOT NULL,
    "dni" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "photo" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "access" (
    "access_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" TEXT DEFAULT 'offline',
    "active" BOOLEAN,
    "last_session" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "temporal_code" TEXT,
    "position_id" INTEGER,

    CONSTRAINT "access_pkey" PRIMARY KEY ("access_id")
);

-- CreateTable
CREATE TABLE "area" (
    "area_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "area_pkey" PRIMARY KEY ("area_id")
);

-- CreateTable
CREATE TABLE "position" (
    "position_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "area_id" INTEGER NOT NULL,

    CONSTRAINT "position_pkey" PRIMARY KEY ("position_id")
);

-- CreateTable
CREATE TABLE "ticket" (
    "ticket_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "agent_id" INTEGER,
    "category_id" INTEGER NOT NULL,
    "priority_id" INTEGER NOT NULL,
    "subject" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pendiente',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "resolved_at" TIMESTAMP(3),
    "closed_at" TIMESTAMP(3),

    CONSTRAINT "ticket_pkey" PRIMARY KEY ("ticket_id")
);

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
    "insured_status" TEXT,
    "admission" INTEGER,
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
CREATE TABLE "ticket_photo" (
    "photo_id" SERIAL NOT NULL,
    "ticket_id" INTEGER NOT NULL,
    "filename" TEXT NOT NULL,

    CONSTRAINT "ticket_photo_pkey" PRIMARY KEY ("photo_id")
);

-- CreateTable
CREATE TABLE "ticket_comment" (
    "comment_id" SERIAL NOT NULL,
    "ticket_id" INTEGER,
    "ticket_billing_id" INTEGER,
    "user_id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ticket_comment_pkey" PRIMARY KEY ("comment_id")
);

-- CreateTable
CREATE TABLE "category" (
    "category_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "category_billing" (
    "category_billing_id" SERIAL NOT NULL,
    "name_Billing" TEXT NOT NULL,

    CONSTRAINT "category_billing_pkey" PRIMARY KEY ("category_billing_id")
);

-- CreateTable
CREATE TABLE "priority" (
    "priority_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "priority_pkey" PRIMARY KEY ("priority_id")
);

-- CreateTable
CREATE TABLE "room" (
    "room_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "room_pkey" PRIMARY KEY ("room_id")
);

-- CreateTable
CREATE TABLE "message" (
    "message_id" SERIAL NOT NULL,
    "room_id" INTEGER NOT NULL,
    "sender_id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "message_pkey" PRIMARY KEY ("message_id")
);

-- CreateTable
CREATE TABLE "room_participant" (
    "participant_id" SERIAL NOT NULL,
    "room_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "room_participant_pkey" PRIMARY KEY ("participant_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_dni_key" ON "user"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "access_username_key" ON "access"("username");

-- CreateIndex
CREATE UNIQUE INDEX "area_name_key" ON "area"("name");

-- CreateIndex
CREATE UNIQUE INDEX "position_name_key" ON "position"("name");

-- CreateIndex
CREATE UNIQUE INDEX "category_name_key" ON "category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "category_billing_name_Billing_key" ON "category_billing"("name_Billing");

-- CreateIndex
CREATE UNIQUE INDEX "priority_name_key" ON "priority"("name");

-- AddForeignKey
ALTER TABLE "access" ADD CONSTRAINT "access_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "access" ADD CONSTRAINT "access_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "position"("position_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "position" ADD CONSTRAINT "position_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "area"("area_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "access"("access_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_priority_id_fkey" FOREIGN KEY ("priority_id") REFERENCES "priority"("priority_id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE "ticket_photo" ADD CONSTRAINT "ticket_photo_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "ticket"("ticket_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_comment" ADD CONSTRAINT "ticket_comment_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "ticket"("ticket_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_comment" ADD CONSTRAINT "ticket_comment_ticket_billing_id_fkey" FOREIGN KEY ("ticket_billing_id") REFERENCES "ticket_billing"("ticket_billing_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_comment" ADD CONSTRAINT "ticket_comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "room"("room_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_participant" ADD CONSTRAINT "room_participant_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "room"("room_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_participant" ADD CONSTRAINT "room_participant_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
