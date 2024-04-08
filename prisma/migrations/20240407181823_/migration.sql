/*
  Warnings:

  - You are about to drop the column `idProduct` on the `Sales` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Sales" DROP CONSTRAINT "Sales_idProduct_fkey";

-- AlterTable
ALTER TABLE "Sales" DROP COLUMN "idProduct";
