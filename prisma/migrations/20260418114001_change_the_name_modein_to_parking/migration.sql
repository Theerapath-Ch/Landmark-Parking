/*
  Warnings:

  - You are about to drop the `modein` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "modein";

-- CreateTable
CREATE TABLE "parking" (
    "id" TEXT NOT NULL,
    "plate_number" TEXT NOT NULL,
    "in_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "out_at" TIMESTAMP(3),

    CONSTRAINT "parking_pkey" PRIMARY KEY ("id")
);
