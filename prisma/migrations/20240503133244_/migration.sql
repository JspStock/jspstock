/*
  Warnings:

  - Added the required column `saldo` to the `TransactionRecords` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TransactionRecords" ADD COLUMN     "saldo" INTEGER NOT NULL;
