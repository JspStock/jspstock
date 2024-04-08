/*
  Warnings:

  - You are about to drop the `PurchasePayment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SalePayment` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `idProduct` on table `PurchaseOrder` required. This step will fail if there are existing NULL values in that column.
  - Made the column `idProduct` on table `SaleOrder` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "PurchaseOrder" DROP CONSTRAINT "PurchaseOrder_idProduct_fkey";

-- DropForeignKey
ALTER TABLE "PurchasePayment" DROP CONSTRAINT "PurchasePayment_idPurchase_fkey";

-- DropForeignKey
ALTER TABLE "PurchasePayment" DROP CONSTRAINT "PurchasePayment_idSavingAccount_fkey";

-- DropForeignKey
ALTER TABLE "PurchasePayment" DROP CONSTRAINT "PurchasePayment_idStore_fkey";

-- DropForeignKey
ALTER TABLE "SaleOrder" DROP CONSTRAINT "SaleOrder_idProduct_fkey";

-- DropForeignKey
ALTER TABLE "SalePayment" DROP CONSTRAINT "SalePayment_idProduct_fkey";

-- DropForeignKey
ALTER TABLE "SalePayment" DROP CONSTRAINT "SalePayment_idSales_fkey";

-- DropForeignKey
ALTER TABLE "SalePayment" DROP CONSTRAINT "SalePayment_idStore_fkey";

-- AlterTable
ALTER TABLE "PurchaseOrder" ALTER COLUMN "idProduct" SET NOT NULL;

-- AlterTable
ALTER TABLE "SaleOrder" ALTER COLUMN "idProduct" SET NOT NULL;

-- DropTable
DROP TABLE "PurchasePayment";

-- DropTable
DROP TABLE "SalePayment";

-- AddForeignKey
ALTER TABLE "PurchaseOrder" ADD CONSTRAINT "PurchaseOrder_idProduct_fkey" FOREIGN KEY ("idProduct") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleOrder" ADD CONSTRAINT "SaleOrder_idProduct_fkey" FOREIGN KEY ("idProduct") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
