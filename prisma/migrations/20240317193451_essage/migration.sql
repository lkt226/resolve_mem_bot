/*
  Warnings:

  - You are about to drop the column `essage` on the `chat` table. All the data in the column will be lost.
  - Added the required column `message` to the `chat` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_chat" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "chat_id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_chat" ("chat_id", "created_at", "id", "updated_at") SELECT "chat_id", "created_at", "id", "updated_at" FROM "chat";
DROP TABLE "chat";
ALTER TABLE "new_chat" RENAME TO "chat";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
