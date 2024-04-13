/*
  Warnings:

  - You are about to drop the column `idProduct` on the `SaleReturns` table. All the data in the column will be lost.
  - Made the column `idPurchase` on table `PurchaseReturns` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `idSales` to the `SaleReturns` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PurchaseReturns" DROP CONSTRAINT "PurchaseReturns_idPurchase_fkey";

-- DropForeignKey
ALTER TABLE "SaleReturns" DROP CONSTRAINT "SaleReturns_idProduct_fkey";

-- AlterTable
ALTER TABLE "PurchaseReturns" ALTER COLUMN "idPurchase" SET NOT NULL;

-- AlterTable
ALTER TABLE "SaleReturns" DROP COLUMN "idProduct",
ADD COLUMN     "idSales" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "SaleReturns" ADD CONSTRAINT "SaleReturns_idSales_fkey" FOREIGN KEY ("idSales") REFERENCES "Sales"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseReturns" ADD CONSTRAINT "PurchaseReturns_idPurchase_fkey" FOREIGN KEY ("idPurchase") REFERENCES "Purchase"("id") ON DELETE CASCADE ON UPDATE CASCADE;
