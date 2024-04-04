/*
  Warnings:

  - You are about to drop the column `subTotal` on the `Purchase` table. All the data in the column will be lost.
  - You are about to drop the column `unitCost` on the `PurchaseOrder` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "subTotal";

-- AlterTable
ALTER TABLE "PurchaseOrder" DROP COLUMN "unitCost";
