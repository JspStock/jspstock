/*
  Warnings:

  - Added the required column `qty` to the `PurchaseReturns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qty` to the `SaleReturns` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PurchaseReturns" ADD COLUMN     "qty" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SaleReturns" ADD COLUMN     "qty" INTEGER NOT NULL;
