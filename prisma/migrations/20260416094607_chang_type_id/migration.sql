/*
  Warnings:

  - The primary key for the `modein` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "modein" DROP CONSTRAINT "modein_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "modein_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "modein_id_seq";
