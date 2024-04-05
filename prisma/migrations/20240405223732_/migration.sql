/*
  Warnings:

  - You are about to drop the column `idProduct` on the `Purchase` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_idProduct_fkey";

-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "idProduct";
