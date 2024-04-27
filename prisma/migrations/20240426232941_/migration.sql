-- CreateTable
CREATE TABLE "TransactionRecords" (
    "id" TEXT NOT NULL,
    "idStore" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "debit" INTEGER NOT NULL,
    "credit" INTEGER NOT NULL,
    "balance" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TransactionRecords_pkey" PRIMARY KEY ("id")
);
