/*
  Warnings:

  - You are about to drop the column `discount` on the `Purchase` table. All the data in the column will be lost.
  - You are about to drop the column `shippingCost` on the `Purchase` table. All the data in the column will be lost.
  - Added the required column `total` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idPurchase` to the `PurchaseReturns` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "discount",
DROP COLUMN "shippingCost",
ADD COLUMN     "total" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "PurchaseReturns" ADD COLUMN     "idPurchase" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "PurchaseReturns" ADD CONSTRAINT "PurchaseReturns_idPurchase_fkey" FOREIGN KEY ("idPurchase") REFERENCES "Purchase"("id") ON DELETE CASCADE ON UPDATE CASCADE;
