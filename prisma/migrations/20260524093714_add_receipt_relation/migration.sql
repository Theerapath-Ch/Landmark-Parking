/*
  Warnings:

  - You are about to drop the column `usename` on the `checktime` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_admin" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "lastname" TEXT,
    "username" TEXT,
    "pass" INTEGER NOT NULL,
    "createAt" DATETIME NOT NULL
);
INSERT INTO "new_admin" ("createAt", "id", "lastname", "name", "pass", "username") SELECT "createAt", "id", "lastname", "name", "pass", "username" FROM "admin";
DROP TABLE "admin";
ALTER TABLE "new_admin" RENAME TO "admin";
CREATE UNIQUE INDEX "admin_username_key" ON "admin"("username");
CREATE TABLE "new_checktime" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT,
    "chkIn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "chkOut" DATETIME,
    "shift" TEXT NOT NULL,
    CONSTRAINT "checktime_username_fkey" FOREIGN KEY ("username") REFERENCES "admin" ("username") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_checktime" ("chkIn", "chkOut", "id", "shift") SELECT "chkIn", "chkOut", "id", "shift" FROM "checktime";
DROP TABLE "checktime";
ALTER TABLE "new_checktime" RENAME TO "checktime";
CREATE TABLE "new_receipt" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "price" INTEGER,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "discount" TEXT,
    "remark" TEXT,
    "parkingId" TEXT NOT NULL,
    "checktimeID" INTEGER,
    CONSTRAINT "receipt_parkingId_fkey" FOREIGN KEY ("parkingId") REFERENCES "parking" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "receipt_checktimeID_fkey" FOREIGN KEY ("checktimeID") REFERENCES "checktime" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_receipt" ("discount", "id", "parkingId", "price", "remark", "status") SELECT "discount", "id", "parkingId", "price", "remark", "status" FROM "receipt";
DROP TABLE "receipt";
ALTER TABLE "new_receipt" RENAME TO "receipt";
CREATE UNIQUE INDEX "receipt_parkingId_key" ON "receipt"("parkingId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
