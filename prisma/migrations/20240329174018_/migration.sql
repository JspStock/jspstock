-- DropForeignKey
ALTER TABLE "ProductCategories" DROP CONSTRAINT "ProductCategories_idProductCategories_fkey";

-- AddForeignKey
ALTER TABLE "ProductCategories" ADD CONSTRAINT "ProductCategories_idProductCategories_fkey" FOREIGN KEY ("idProductCategories") REFERENCES "ProductCategories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
