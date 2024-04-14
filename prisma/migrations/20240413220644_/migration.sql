/*
  Warnings:

  - You are about to drop the column `idPurchase` on the `PurchaseReturns` table. All the data in the column will be lost.
  - You are about to drop the column `qty` on the `PurchaseReturns` table. All the data in the column will be lost.
  - You are about to drop the column `idSales` on the `SaleReturns` table. All the data in the column will be lost.
  - You are about to drop the column `qty` on the `SaleReturns` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PurchaseReturns" DROP CONSTRAINT "PurchaseReturns_idPurchase_fkey";

-- DropForeignKey
ALTER TABLE "SaleReturns" DROP CONSTRAINT "SaleReturns_idSales_fkey";

-- AlterTable
ALTER TABLE "PurchaseReturns" DROP COLUMN "idPurchase",
DROP COLUMN "qty";

-- AlterTable
ALTER TABLE "SaleReturns" DROP COLUMN "idSales",
DROP COLUMN "qty";

-- CreateTable
CREATE TABLE "SaleReturnOrders" (
    "id" TEXT NOT NULL,
    "idStore" TEXT NOT NULL,
    "idProduct" TEXT,
    "idSaleReturn" TEXT NOT NULL,
    "qty" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SaleReturnOrders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseReturnOrders" (
    "id" TEXT NOT NULL,
    "idStore" TEXT NOT NULL,
    "idProduct" TEXT,
    "idPurchaseReturn" TEXT NOT NULL,
    "qty" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PurchaseReturnOrders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SaleReturnOrders" ADD CONSTRAINT "SaleReturnOrders_idStore_fkey" FOREIGN KEY ("idStore") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleReturnOrders" ADD CONSTRAINT "SaleReturnOrders_idProduct_fkey" FOREIGN KEY ("idProduct") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleReturnOrders" ADD CONSTRAINT "SaleReturnOrders_idSaleReturn_fkey" FOREIGN KEY ("idSaleReturn") REFERENCES "SaleReturns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseReturnOrders" ADD CONSTRAINT "PurchaseReturnOrders_idStore_fkey" FOREIGN KEY ("idStore") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseReturnOrders" ADD CONSTRAINT "PurchaseReturnOrders_idProduct_fkey" FOREIGN KEY ("idProduct") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseReturnOrders" ADD CONSTRAINT "PurchaseReturnOrders_idPurchaseReturn_fkey" FOREIGN KEY ("idPurchaseReturn") REFERENCES "PurchaseReturns"("id") ON DELETE CASCADE ON UPDATE CASCADE;
