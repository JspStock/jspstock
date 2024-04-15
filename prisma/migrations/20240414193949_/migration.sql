/*
  Warnings:

  - The values [SEDANG_MENGEMAS] on the enum `PackagingStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PackagingStatus_new" AS ENUM ('SEDANG_MENGIRIM', 'TERKIRIM');
ALTER TABLE "Packaging" ALTER COLUMN "status" TYPE "PackagingStatus_new" USING ("status"::text::"PackagingStatus_new");
ALTER TYPE "PackagingStatus" RENAME TO "PackagingStatus_old";
ALTER TYPE "PackagingStatus_new" RENAME TO "PackagingStatus";
DROP TYPE "PackagingStatus_old";
COMMIT;
