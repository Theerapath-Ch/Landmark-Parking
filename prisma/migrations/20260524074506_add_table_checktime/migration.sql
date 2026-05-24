-- CreateTable
CREATE TABLE "checktime" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usename" TEXT NOT NULL,
    "chkIn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "chkOut" DATETIME,
    "shift" TEXT NOT NULL,
    CONSTRAINT "checktime_usename_fkey" FOREIGN KEY ("usename") REFERENCES "admin" ("username") ON DELETE RESTRICT ON UPDATE CASCADE
);
