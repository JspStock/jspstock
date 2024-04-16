/*
  Warnings:

  - You are about to drop the `SavingAccounts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Expenditures" DROP CONSTRAINT "Expenditures_idSavingAccount_fkey";

-- DropForeignKey
ALTER TABLE "MoneyTransfer" DROP CONSTRAINT "MoneyTransfer_fromSavingAccount_fkey";

-- DropForeignKey
ALTER TABLE "MoneyTransfer" DROP CONSTRAINT "MoneyTransfer_toSavingAccount_fkey";

-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_idSavingAccount_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseReturns" DROP CONSTRAINT "PurchaseReturns_idSavingAccount_fkey";

-- DropForeignKey
ALTER TABLE "SaleReturns" DROP CONSTRAINT "SaleReturns_idSavingAccount_fkey";

-- DropForeignKey
ALTER TABLE "Sales" DROP CONSTRAINT "Sales_idSavingAccount_fkey";

-- DropForeignKey
ALTER TABLE "SavingAccounts" DROP CONSTRAINT "SavingAccounts_idStore_fkey";

-- DropTable
DROP TABLE "SavingAccounts";

-- CreateTable
CREATE TABLE "savingAccounts" (
    "id" TEXT NOT NULL,
    "idStore" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startingBalance" INTEGER NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "savingAccounts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "savingAccounts" ADD CONSTRAINT "savingAccounts_idStore_fkey" FOREIGN KEY ("idStore") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_idSavingAccount_fkey" FOREIGN KEY ("idSavingAccount") REFERENCES "savingAccounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_idSavingAccount_fkey" FOREIGN KEY ("idSavingAccount") REFERENCES "savingAccounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expenditures" ADD CONSTRAINT "Expenditures_idSavingAccount_fkey" FOREIGN KEY ("idSavingAccount") REFERENCES "savingAccounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleReturns" ADD CONSTRAINT "SaleReturns_idSavingAccount_fkey" FOREIGN KEY ("idSavingAccount") REFERENCES "savingAccounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseReturns" ADD CONSTRAINT "PurchaseReturns_idSavingAccount_fkey" FOREIGN KEY ("idSavingAccount") REFERENCES "savingAccounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoneyTransfer" ADD CONSTRAINT "MoneyTransfer_fromSavingAccount_fkey" FOREIGN KEY ("fromSavingAccount") REFERENCES "savingAccounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoneyTransfer" ADD CONSTRAINT "MoneyTransfer_toSavingAccount_fkey" FOREIGN KEY ("toSavingAccount") REFERENCES "savingAccounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
