/*
  Warnings:

  - You are about to drop the column `qty` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "qty";

-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "idSavingAccount" TEXT;

-- AlterTable
ALTER TABLE "PurchaseReturns" ADD COLUMN     "idSavingAccount" TEXT;

-- AlterTable
ALTER TABLE "SaleReturns" ADD COLUMN     "idSavingAccount" TEXT;

-- AlterTable
ALTER TABLE "Sales" ADD COLUMN     "idSavingAccount" TEXT;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_idSavingAccount_fkey" FOREIGN KEY ("idSavingAccount") REFERENCES "SavingAccounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_idSavingAccount_fkey" FOREIGN KEY ("idSavingAccount") REFERENCES "SavingAccounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleReturns" ADD CONSTRAINT "SaleReturns_idSavingAccount_fkey" FOREIGN KEY ("idSavingAccount") REFERENCES "SavingAccounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseReturns" ADD CONSTRAINT "PurchaseReturns_idSavingAccount_fkey" FOREIGN KEY ("idSavingAccount") REFERENCES "SavingAccounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
