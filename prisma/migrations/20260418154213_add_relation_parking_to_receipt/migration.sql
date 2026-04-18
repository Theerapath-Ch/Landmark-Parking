-- CreateTable
CREATE TABLE "receipt" (
    "id" SERIAL NOT NULL,
    "price" INTEGER,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "parkingId" TEXT NOT NULL,

    CONSTRAINT "receipt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "receipt_parkingId_key" ON "receipt"("parkingId");

-- AddForeignKey
ALTER TABLE "receipt" ADD CONSTRAINT "receipt_parkingId_fkey" FOREIGN KEY ("parkingId") REFERENCES "parking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
