/*
  Warnings:

  - The values [SEDANG_MENGIRIM] on the enum `PackagingStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `city` on the `CustomerUser` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `CustomerUser` table. All the data in the column will be lost.
  - You are about to drop the column `region` on the `CustomerUser` table. All the data in the column will be lost.
  - You are about to drop the column `zipCode` on the `CustomerUser` table. All the data in the column will be lost.
  - You are about to drop the column `documentPath` on the `Sales` table. All the data in the column will be lost.
  - You are about to drop the column `purchaseStatus` on the `Sales` table. All the data in the column will be lost.
  - You are about to drop the column `saleNotes` on the `Sales` table. All the data in the column will be lost.
  - You are about to drop the column `saleStatus` on the `Sales` table. All the data in the column will be lost.
  - You are about to drop the column `staffNotes` on the `Sales` table. All the data in the column will be lost.
  - You are about to drop the `PurchaseOrder` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `qty` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PackagingStatus_new" AS ENUM ('MENUNGGU_KURIR', 'PICKUP', 'TERKIRIM');
ALTER TABLE "Packaging" ALTER COLUMN "status" TYPE "PackagingStatus_new" USING ("status"::text::"PackagingStatus_new");
ALTER TYPE "PackagingStatus" RENAME TO "PackagingStatus_old";
ALTER TYPE "PackagingStatus_new" RENAME TO "PackagingStatus";
DROP TYPE "PackagingStatus_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "PurchaseOrder" DROP CONSTRAINT "PurchaseOrder_idProduct_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseOrder" DROP CONSTRAINT "PurchaseOrder_idPurchase_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseOrder" DROP CONSTRAINT "PurchaseOrder_idStore_fkey";

-- AlterTable
ALTER TABLE "CustomerUser" DROP COLUMN "city",
DROP COLUMN "email",
DROP COLUMN "region",
DROP COLUMN "zipCode";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "qty" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Sales" DROP COLUMN "documentPath",
DROP COLUMN "purchaseStatus",
DROP COLUMN "saleNotes",
DROP COLUMN "saleStatus",
DROP COLUMN "staffNotes",
ADD COLUMN     "notes" TEXT;

-- DropTable
DROP TABLE "PurchaseOrder";

-- DropEnum
DROP TYPE "SalePurchaseStatus";

-- DropEnum
DROP TYPE "SaleStatus";
