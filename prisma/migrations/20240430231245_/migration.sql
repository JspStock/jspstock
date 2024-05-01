/*
  Warnings:

  - You are about to drop the column `idSupplier` on the `PurchaseReturns` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PurchaseReturns" DROP CONSTRAINT "PurchaseReturns_idSupplier_fkey";

-- AlterTable
ALTER TABLE "PurchaseReturns" DROP COLUMN "idSupplier";
