-- CreateEnum
CREATE TYPE "Role" AS ENUM ('OWNER', 'ADMIN', 'STAFF');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('AKTIF', 'NONAKTIF');

-- CreateEnum
CREATE TYPE "PurchaseStatus" AS ENUM ('DITERIMA', 'SEBAGIAN', 'TERTUNDA', 'DIORDER');

-- CreateEnum
CREATE TYPE "SalePurchaseStatus" AS ENUM ('JATUH_TEMPO', 'DIBAYAR', 'SEBAGIAN', 'TERTUNDA');

-- CreateEnum
CREATE TYPE "SaleStatus" AS ENUM ('SELESAI', 'TERTUNDA');

-- CreateEnum
CREATE TYPE "PaymentMethods" AS ENUM ('TUNAI', 'TRANSFER', 'LAINNYA');

-- CreateTable
CREATE TABLE "Store" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "noWa" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "idStore" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "noWa" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "status" "UserStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerGroup" (
    "id" TEXT NOT NULL,
    "idStore" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CustomerGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerUser" (
    "id" TEXT NOT NULL,
    "idStore" TEXT NOT NULL,
    "idCustomerGroup" TEXT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "noWa" TEXT NOT NULL,
    "address" TEXT,
    "city" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CustomerUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "id" TEXT NOT NULL,
    "idStore" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "noWa" TEXT NOT NULL,
    "address" TEXT,
    "city" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavingAccounts" (
    "id" TEXT NOT NULL,
    "idStore" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startingBalance" INTEGER NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavingAccounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductCategories" (
    "id" TEXT NOT NULL,
    "idStore" TEXT NOT NULL,
    "idProductCategories" TEXT,
    "imagePath" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "idStore" TEXT NOT NULL,
    "idProductCategories" TEXT,
    "imagePath" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "qty" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "cost" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Purchase" (
    "id" TEXT NOT NULL,
    "idStore" TEXT NOT NULL,
    "idSupplier" TEXT,
    "idProduct" TEXT,
    "discount" INTEGER NOT NULL DEFAULT 0,
    "shippingCost" INTEGER NOT NULL DEFAULT 0,
    "notes" TEXT,
    "subTotal" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseOrder" (
    "id" TEXT NOT NULL,
    "idStore" TEXT NOT NULL,
    "idPurchase" TEXT NOT NULL,
    "idProduct" TEXT,
    "qty" INTEGER NOT NULL,
    "unitCost" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PurchaseOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchasePayment" (
    "id" TEXT NOT NULL,
    "idStore" TEXT NOT NULL,
    "idPurchase" TEXT NOT NULL,
    "idSavingAccount" TEXT,
    "total" INTEGER NOT NULL,
    "paymentMethods" "PaymentMethods" NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PurchasePayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sales" (
    "id" TEXT NOT NULL,
    "idStore" TEXT NOT NULL,
    "idProduct" TEXT,
    "idCustomerUser" TEXT,
    "saleStatus" "SaleStatus" NOT NULL,
    "purchaseStatus" "SalePurchaseStatus" NOT NULL,
    "discount" INTEGER NOT NULL DEFAULT 0,
    "shippingCost" INTEGER NOT NULL DEFAULT 0,
    "saleNotes" TEXT,
    "staffNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SaleOrder" (
    "id" TEXT NOT NULL,
    "idStore" TEXT NOT NULL,
    "idSale" TEXT NOT NULL,
    "idProduct" TEXT,
    "qty" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SaleOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SalePayment" (
    "id" TEXT NOT NULL,
    "idStore" TEXT NOT NULL,
    "idSales" TEXT NOT NULL,
    "idProduct" TEXT,
    "qty" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SalePayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExpenditureCategory" (
    "id" TEXT NOT NULL,
    "idStore" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExpenditureCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expenditures" (
    "id" TEXT NOT NULL,
    "idStore" TEXT NOT NULL,
    "idSavingAccount" TEXT,
    "idExpenditureCategory" TEXT,
    "total" INTEGER NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Expenditures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SaleReturns" (
    "id" TEXT NOT NULL,
    "idStore" TEXT NOT NULL,
    "idCustomerUser" TEXT,
    "idProduct" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SaleReturns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseReturns" (
    "id" TEXT NOT NULL,
    "idStore" TEXT NOT NULL,
    "idSupplier" TEXT,
    "idPurchase" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PurchaseReturns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Packaging" (
    "id" TEXT NOT NULL,
    "idStore" TEXT NOT NULL,
    "idCustomerUser" TEXT NOT NULL,
    "idProduct" TEXT NOT NULL,
    "costShiping" INTEGER,
    "discount" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Packaging_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PackagingOrder" (
    "id" TEXT NOT NULL,
    "idStore" TEXT NOT NULL,
    "idPackaging" TEXT NOT NULL,
    "idProduct" TEXT NOT NULL,
    "qty" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PackagingOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MoneyTransfer" (
    "id" TEXT NOT NULL,
    "idStore" TEXT NOT NULL,
    "fromSavingAccount" TEXT,
    "toSavingAccount" TEXT,
    "total" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MoneyTransfer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Store_email_key" ON "Store"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Store_noWa_key" ON "Store"("noWa");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_noWa_key" ON "User"("noWa");

-- CreateIndex
CREATE UNIQUE INDEX "CustomerUser_email_key" ON "CustomerUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "CustomerUser_noWa_key" ON "CustomerUser"("noWa");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_email_key" ON "Supplier"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_noWa_key" ON "Supplier"("noWa");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_idStore_fkey" FOREIGN KEY ("idStore") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerGroup" ADD CONSTRAINT "CustomerGroup_idStore_fkey" FOREIGN KEY ("idStore") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerUser" ADD CONSTRAINT "CustomerUser_idStore_fkey" FOREIGN KEY ("idStore") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerUser" ADD CONSTRAINT "CustomerUser_idCustomerGroup_fkey" FOREIGN KEY ("idCustomerGroup") REFERENCES "CustomerGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Supplier" ADD CONSTRAINT "Supplier_idStore_fkey" FOREIGN KEY ("idStore") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavingAccounts" ADD CONSTRAINT "SavingAccounts_idStore_fkey" FOREIGN KEY ("idStore") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCategories" ADD CONSTRAINT "ProductCategories_idStore_fkey" FOREIGN KEY ("idStore") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCategories" ADD CONSTRAINT "ProductCategories_idProductCategories_fkey" FOREIGN KEY ("idProductCategories") REFERENCES "ProductCategories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_idStore_fkey" FOREIGN KEY ("idStore") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_idProductCategories_fkey" FOREIGN KEY ("idProductCategories") REFERENCES "ProductCategories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_idStore_fkey" FOREIGN KEY ("idStore") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_idSupplier_fkey" FOREIGN KEY ("idSupplier") REFERENCES "Supplier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_idProduct_fkey" FOREIGN KEY ("idProduct") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrder" ADD CONSTRAINT "PurchaseOrder_idStore_fkey" FOREIGN KEY ("idStore") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrder" ADD CONSTRAINT "PurchaseOrder_idPurchase_fkey" FOREIGN KEY ("idPurchase") REFERENCES "Purchase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrder" ADD CONSTRAINT "PurchaseOrder_idProduct_fkey" FOREIGN KEY ("idProduct") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchasePayment" ADD CONSTRAINT "PurchasePayment_idStore_fkey" FOREIGN KEY ("idStore") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchasePayment" ADD CONSTRAINT "PurchasePayment_idPurchase_fkey" FOREIGN KEY ("idPurchase") REFERENCES "Purchase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchasePayment" ADD CONSTRAINT "PurchasePayment_idSavingAccount_fkey" FOREIGN KEY ("idSavingAccount") REFERENCES "SavingAccounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_idStore_fkey" FOREIGN KEY ("idStore") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_idProduct_fkey" FOREIGN KEY ("idProduct") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_idCustomerUser_fkey" FOREIGN KEY ("idCustomerUser") REFERENCES "CustomerUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleOrder" ADD CONSTRAINT "SaleOrder_idStore_fkey" FOREIGN KEY ("idStore") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleOrder" ADD CONSTRAINT "SaleOrder_idSale_fkey" FOREIGN KEY ("idSale") REFERENCES "Sales"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleOrder" ADD CONSTRAINT "SaleOrder_idProduct_fkey" FOREIGN KEY ("idProduct") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalePayment" ADD CONSTRAINT "SalePayment_idStore_fkey" FOREIGN KEY ("idStore") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalePayment" ADD CONSTRAINT "SalePayment_idSales_fkey" FOREIGN KEY ("idSales") REFERENCES "Sales"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalePayment" ADD CONSTRAINT "SalePayment_idProduct_fkey" FOREIGN KEY ("idProduct") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpenditureCategory" ADD CONSTRAINT "ExpenditureCategory_idStore_fkey" FOREIGN KEY ("idStore") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expenditures" ADD CONSTRAINT "Expenditures_idStore_fkey" FOREIGN KEY ("idStore") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expenditures" ADD CONSTRAINT "Expenditures_idSavingAccount_fkey" FOREIGN KEY ("idSavingAccount") REFERENCES "SavingAccounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expenditures" ADD CONSTRAINT "Expenditures_idExpenditureCategory_fkey" FOREIGN KEY ("idExpenditureCategory") REFERENCES "ExpenditureCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleReturns" ADD CONSTRAINT "SaleReturns_idStore_fkey" FOREIGN KEY ("idStore") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleReturns" ADD CONSTRAINT "SaleReturns_idCustomerUser_fkey" FOREIGN KEY ("idCustomerUser") REFERENCES "CustomerUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleReturns" ADD CONSTRAINT "SaleReturns_idProduct_fkey" FOREIGN KEY ("idProduct") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseReturns" ADD CONSTRAINT "PurchaseReturns_idStore_fkey" FOREIGN KEY ("idStore") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseReturns" ADD CONSTRAINT "PurchaseReturns_idSupplier_fkey" FOREIGN KEY ("idSupplier") REFERENCES "Supplier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseReturns" ADD CONSTRAINT "PurchaseReturns_idPurchase_fkey" FOREIGN KEY ("idPurchase") REFERENCES "Purchase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Packaging" ADD CONSTRAINT "Packaging_idStore_fkey" FOREIGN KEY ("idStore") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Packaging" ADD CONSTRAINT "Packaging_idCustomerUser_fkey" FOREIGN KEY ("idCustomerUser") REFERENCES "CustomerUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Packaging" ADD CONSTRAINT "Packaging_idProduct_fkey" FOREIGN KEY ("idProduct") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackagingOrder" ADD CONSTRAINT "PackagingOrder_idStore_fkey" FOREIGN KEY ("idStore") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackagingOrder" ADD CONSTRAINT "PackagingOrder_idPackaging_fkey" FOREIGN KEY ("idPackaging") REFERENCES "Packaging"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackagingOrder" ADD CONSTRAINT "PackagingOrder_idProduct_fkey" FOREIGN KEY ("idProduct") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoneyTransfer" ADD CONSTRAINT "MoneyTransfer_fromSavingAccount_fkey" FOREIGN KEY ("fromSavingAccount") REFERENCES "SavingAccounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoneyTransfer" ADD CONSTRAINT "MoneyTransfer_toSavingAccount_fkey" FOREIGN KEY ("toSavingAccount") REFERENCES "SavingAccounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
