-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "idSupplier" TEXT;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_idSupplier_fkey" FOREIGN KEY ("idSupplier") REFERENCES "Supplier"("id") ON DELETE SET NULL ON UPDATE SET NULL;
