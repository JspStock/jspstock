/*
  Warnings:

  - Added the required column `idSavingAccount` to the `TransactionRecords` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TransactionRecords" ADD COLUMN     "idSavingAccount" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "TransactionRecords" ADD CONSTRAINT "TransactionRecords_idSavingAccount_fkey" FOREIGN KEY ("idSavingAccount") REFERENCES "SavingAccounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
