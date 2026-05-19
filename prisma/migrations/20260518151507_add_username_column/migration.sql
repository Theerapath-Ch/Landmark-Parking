/*
  Warnings:

  - Added the required column `username` to the `admin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "admin" ADD COLUMN     "username" INTEGER NOT NULL;
