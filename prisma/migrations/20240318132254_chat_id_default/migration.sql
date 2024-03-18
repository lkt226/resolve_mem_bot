/*
  Warnings:

  - You are about to alter the column `chat_id` on the `chat` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `chat_id` on the `voiceMessage` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_chat" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "chat_id" INTEGER NOT NULL,
    "message" TEXT NOT NULL DEFAULT '',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_chat" ("chat_id", "created_at", "id", "message", "updated_at") SELECT "chat_id", "created_at", "id", "message", "updated_at" FROM "chat";
DROP TABLE "chat";
ALTER TABLE "new_chat" RENAME TO "chat";
CREATE UNIQUE INDEX "chat_chat_id_key" ON "chat"("chat_id");
CREATE TABLE "new_voiceMessage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "chat_id" INTEGER NOT NULL,
    "voice_url" TEXT NOT NULL,
    "transcription" TEXT NOT NULL DEFAULT '',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_voiceMessage" ("chat_id", "created_at", "id", "transcription", "updated_at", "voice_url") SELECT "chat_id", "created_at", "id", "transcription", "updated_at", "voice_url" FROM "voiceMessage";
DROP TABLE "voiceMessage";
ALTER TABLE "new_voiceMessage" RENAME TO "voiceMessage";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
