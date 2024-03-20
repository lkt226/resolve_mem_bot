-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_voiceMessage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "chat_id" TEXT NOT NULL,
    "voice_url" TEXT,
    "original_text" TEXT NOT NULL,
    "transcription" TEXT NOT NULL DEFAULT '',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_voiceMessage" ("chat_id", "created_at", "id", "original_text", "transcription", "updated_at", "voice_url") SELECT "chat_id", "created_at", "id", "original_text", "transcription", "updated_at", "voice_url" FROM "voiceMessage";
DROP TABLE "voiceMessage";
ALTER TABLE "new_voiceMessage" RENAME TO "voiceMessage";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
