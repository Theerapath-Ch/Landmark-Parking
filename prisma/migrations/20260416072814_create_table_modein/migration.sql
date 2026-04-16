-- CreateTable
CREATE TABLE "modein" (
    "id" SERIAL NOT NULL,
    "plate_number" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "modein_pkey" PRIMARY KEY ("id")
);
