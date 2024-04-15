/*
  Warnings:

  - You are about to drop the column `costShiping` on the `Packaging` table. All the data in the column will be lost.
  - You are about to drop the column `discount` on the `Packaging` table. All the data in the column will be lost.
  - You are about to drop the column `idProduct` on the `Packaging` table. All the data in the column will be lost.
  - You are about to drop the `PackagingOrder` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `address` to the `Packaging` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Packaging` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PackagingStatus" AS ENUM ('SEDANG_MENGEMAS', 'SEDANG_MENGIRIM', 'TERKIRIM');

-- DropForeignKey
ALTER TABLE "Packaging" DROP CONSTRAINT "Packaging_idCustomerUser_fkey";

-- DropForeignKey
ALTER TABLE "Packaging" DROP CONSTRAINT "Packaging_idProduct_fkey";

-- DropForeignKey
ALTER TABLE "PackagingOrder" DROP CONSTRAINT "PackagingOrder_idPackaging_fkey";

-- DropForeignKey
ALTER TABLE "PackagingOrder" DROP CONSTRAINT "PackagingOrder_idProduct_fkey";

-- DropForeignKey
ALTER TABLE "PackagingOrder" DROP CONSTRAINT "PackagingOrder_idStore_fkey";

-- AlterTable
ALTER TABLE "Packaging" DROP COLUMN "costShiping",
DROP COLUMN "discount",
DROP COLUMN "idProduct",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "filePath" TEXT,
ADD COLUMN     "idSales" TEXT,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "status" "PackagingStatus" NOT NULL,
ALTER COLUMN "idCustomerUser" DROP NOT NULL;

-- DropTable
DROP TABLE "PackagingOrder";

-- AddForeignKey
ALTER TABLE "Packaging" ADD CONSTRAINT "Packaging_idCustomerUser_fkey" FOREIGN KEY ("idCustomerUser") REFERENCES "CustomerUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Packaging" ADD CONSTRAINT "Packaging_idSales_fkey" FOREIGN KEY ("idSales") REFERENCES "Sales"("id") ON DELETE SET NULL ON UPDATE CASCADE;
