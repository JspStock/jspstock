/*
  Warnings:

  - You are about to drop the `PurchaseReturnOrders` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PurchaseReturnOrders" DROP CONSTRAINT "PurchaseReturnOrders_idProduct_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseReturnOrders" DROP CONSTRAINT "PurchaseReturnOrders_idPurchaseReturn_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseReturnOrders" DROP CONSTRAINT "PurchaseReturnOrders_idStore_fkey";

-- DropTable
DROP TABLE "PurchaseReturnOrders";
