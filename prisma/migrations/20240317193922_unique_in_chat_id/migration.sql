/*
  Warnings:

  - A unique constraint covering the columns `[chat_id]` on the table `chat` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "chat_chat_id_key" ON "chat"("chat_id");
