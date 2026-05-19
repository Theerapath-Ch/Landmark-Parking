-- CreateTable
CREATE TABLE "admin" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "lastname" TEXT,
    "username" TEXT NOT NULL,
    "pass" INTEGER NOT NULL,
    "createAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "parking" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "plate_number" TEXT NOT NULL,
    "in_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "out_at" DATETIME
);

-- CreateTable
CREATE TABLE "receipt" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "price" INTEGER,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "discount" TEXT,
    "remark" TEXT,
    "parkingId" TEXT NOT NULL,
    CONSTRAINT "receipt_parkingId_fkey" FOREIGN KEY ("parkingId") REFERENCES "parking" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_username_key" ON "admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "receipt_parkingId_key" ON "receipt"("parkingId");
