
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

ALTER SCHEMA "public" OWNER TO "postgres";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE TYPE "public"."PackagingStatus" AS ENUM (
    'SEDANG_MENGIRIM',
    'TERKIRIM'
);

ALTER TYPE "public"."PackagingStatus" OWNER TO "postgres";

CREATE TYPE "public"."PaymentMethods" AS ENUM (
    'TUNAI',
    'TRANSFER',
    'LAINNYA'
);

ALTER TYPE "public"."PaymentMethods" OWNER TO "postgres";

CREATE TYPE "public"."PurchaseStatus" AS ENUM (
    'DITERIMA',
    'SEBAGIAN',
    'TERTUNDA',
    'DIORDER'
);

ALTER TYPE "public"."PurchaseStatus" OWNER TO "postgres";

CREATE TYPE "public"."Role" AS ENUM (
    'OWNER',
    'ADMIN',
    'STAFF'
);

ALTER TYPE "public"."Role" OWNER TO "postgres";

CREATE TYPE "public"."SalePurchaseStatus" AS ENUM (
    'JATUH_TEMPO',
    'DIBAYAR',
    'SEBAGIAN',
    'TERTUNDA'
);

ALTER TYPE "public"."SalePurchaseStatus" OWNER TO "postgres";

CREATE TYPE "public"."SaleStatus" AS ENUM (
    'SELESAI',
    'TERTUNDA'
);

ALTER TYPE "public"."SaleStatus" OWNER TO "postgres";

CREATE TYPE "public"."UserStatus" AS ENUM (
    'AKTIF',
    'NONAKTIF'
);

ALTER TYPE "public"."UserStatus" OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."CustomerGroup" (
    "id" "text" NOT NULL,
    "idStore" "text" NOT NULL,
    "name" "text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

ALTER TABLE "public"."CustomerGroup" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."CustomerUser" (
    "id" "text" NOT NULL,
    "idStore" "text" NOT NULL,
    "idCustomerGroup" "text",
    "name" "text" NOT NULL,
    "email" "text" NOT NULL,
    "noWa" "text" NOT NULL,
    "address" "text",
    "city" "text" NOT NULL,
    "zipCode" "text" NOT NULL,
    "region" "text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

ALTER TABLE "public"."CustomerUser" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."ExpenditureCategory" (
    "id" "text" NOT NULL,
    "idStore" "text" NOT NULL,
    "name" "text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

ALTER TABLE "public"."ExpenditureCategory" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."Expenditures" (
    "id" "text" NOT NULL,
    "idStore" "text" NOT NULL,
    "idSavingAccount" "text",
    "idExpenditureCategory" "text",
    "total" integer NOT NULL,
    "notes" "text",
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

ALTER TABLE "public"."Expenditures" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."MoneyTransfer" (
    "id" "text" NOT NULL,
    "idStore" "text" NOT NULL,
    "fromSavingAccount" "text",
    "toSavingAccount" "text",
    "total" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

ALTER TABLE "public"."MoneyTransfer" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."Packaging" (
    "id" "text" NOT NULL,
    "idStore" "text" NOT NULL,
    "idCustomerUser" "text",
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "address" "text" NOT NULL,
    "filePath" "text",
    "idSales" "text",
    "notes" "text",
    "status" "public"."PackagingStatus" NOT NULL
);

ALTER TABLE "public"."Packaging" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."Product" (
    "id" "text" NOT NULL,
    "idStore" "text" NOT NULL,
    "idProductCategories" "text",
    "imagePath" "text" NOT NULL,
    "name" "text" NOT NULL,
    "price" integer NOT NULL,
    "cost" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "deletedAt" timestamp(3) without time zone
);

ALTER TABLE "public"."Product" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."ProductCategories" (
    "id" "text" NOT NULL,
    "idStore" "text" NOT NULL,
    "idProductCategories" "text",
    "imagePath" "text" NOT NULL,
    "name" "text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

ALTER TABLE "public"."ProductCategories" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."Purchase" (
    "id" "text" NOT NULL,
    "idStore" "text" NOT NULL,
    "idSupplier" "text",
    "discount" integer DEFAULT 0 NOT NULL,
    "shippingCost" integer DEFAULT 0 NOT NULL,
    "notes" "text",
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "documentPath" "text",
    "purchaseStatus" "public"."PurchaseStatus" NOT NULL,
    "idSavingAccount" "text"
);

ALTER TABLE "public"."Purchase" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."PurchaseOrder" (
    "id" "text" NOT NULL,
    "idStore" "text" NOT NULL,
    "idPurchase" "text" NOT NULL,
    "idProduct" "text" NOT NULL,
    "qty" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

ALTER TABLE "public"."PurchaseOrder" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."PurchaseReturnOrders" (
    "id" "text" NOT NULL,
    "idStore" "text" NOT NULL,
    "idProduct" "text",
    "idPurchaseReturn" "text" NOT NULL,
    "qty" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

ALTER TABLE "public"."PurchaseReturnOrders" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."PurchaseReturns" (
    "id" "text" NOT NULL,
    "idStore" "text" NOT NULL,
    "idSupplier" "text",
    "notes" "text",
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "idSavingAccount" "text"
);

ALTER TABLE "public"."PurchaseReturns" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."SaleOrder" (
    "id" "text" NOT NULL,
    "idStore" "text" NOT NULL,
    "idSale" "text" NOT NULL,
    "idProduct" "text" NOT NULL,
    "qty" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

ALTER TABLE "public"."SaleOrder" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."SaleReturnOrders" (
    "id" "text" NOT NULL,
    "idStore" "text" NOT NULL,
    "idProduct" "text",
    "idSaleReturn" "text" NOT NULL,
    "qty" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

ALTER TABLE "public"."SaleReturnOrders" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."SaleReturns" (
    "id" "text" NOT NULL,
    "idStore" "text" NOT NULL,
    "idCustomerUser" "text",
    "notes" "text",
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "idSavingAccount" "text"
);

ALTER TABLE "public"."SaleReturns" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."Sales" (
    "id" "text" NOT NULL,
    "idStore" "text" NOT NULL,
    "idCustomerUser" "text",
    "saleStatus" "public"."SaleStatus" NOT NULL,
    "purchaseStatus" "public"."SalePurchaseStatus" NOT NULL,
    "discount" integer DEFAULT 0 NOT NULL,
    "shippingCost" integer DEFAULT 0 NOT NULL,
    "saleNotes" "text",
    "staffNotes" "text",
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "documentPath" "text",
    "idSavingAccount" "text"
);

ALTER TABLE "public"."Sales" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."SavingAccounts" (
    "id" "text" NOT NULL,
    "idStore" "text" NOT NULL,
    "name" "text" NOT NULL,
    "startingBalance" integer NOT NULL,
    "notes" "text",
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

ALTER TABLE "public"."SavingAccounts" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."Store" (
    "id" "text" NOT NULL,
    "name" "text" NOT NULL,
    "email" "text" NOT NULL,
    "noWa" "text" NOT NULL,
    "address" "text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

ALTER TABLE "public"."Store" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."Supplier" (
    "id" "text" NOT NULL,
    "idStore" "text" NOT NULL,
    "name" "text" NOT NULL,
    "email" "text" NOT NULL,
    "noWa" "text" NOT NULL,
    "address" "text",
    "city" "text" NOT NULL,
    "zipCode" "text" NOT NULL,
    "region" "text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

ALTER TABLE "public"."Supplier" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."User" (
    "id" "text" NOT NULL,
    "idStore" "text",
    "username" "text" NOT NULL,
    "name" "text" NOT NULL,
    "email" "text" NOT NULL,
    "password" "text" NOT NULL,
    "noWa" "text" NOT NULL,
    "role" "public"."Role" NOT NULL,
    "status" "public"."UserStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

ALTER TABLE "public"."User" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."_prisma_migrations" (
    "id" character varying(36) NOT NULL,
    "checksum" character varying(64) NOT NULL,
    "finished_at" timestamp with time zone,
    "migration_name" character varying(255) NOT NULL,
    "logs" "text",
    "rolled_back_at" timestamp with time zone,
    "started_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "applied_steps_count" integer DEFAULT 0 NOT NULL
);

ALTER TABLE "public"."_prisma_migrations" OWNER TO "postgres";

ALTER TABLE ONLY "public"."CustomerGroup"
    ADD CONSTRAINT "CustomerGroup_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."CustomerUser"
    ADD CONSTRAINT "CustomerUser_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."ExpenditureCategory"
    ADD CONSTRAINT "ExpenditureCategory_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."Expenditures"
    ADD CONSTRAINT "Expenditures_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."MoneyTransfer"
    ADD CONSTRAINT "MoneyTransfer_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."Packaging"
    ADD CONSTRAINT "Packaging_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."ProductCategories"
    ADD CONSTRAINT "ProductCategories_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."PurchaseOrder"
    ADD CONSTRAINT "PurchaseOrder_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."PurchaseReturnOrders"
    ADD CONSTRAINT "PurchaseReturnOrders_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."PurchaseReturns"
    ADD CONSTRAINT "PurchaseReturns_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."Purchase"
    ADD CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."SaleOrder"
    ADD CONSTRAINT "SaleOrder_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."SaleReturnOrders"
    ADD CONSTRAINT "SaleReturnOrders_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."SaleReturns"
    ADD CONSTRAINT "SaleReturns_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."Sales"
    ADD CONSTRAINT "Sales_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."SavingAccounts"
    ADD CONSTRAINT "SavingAccounts_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."Store"
    ADD CONSTRAINT "Store_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."Supplier"
    ADD CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."_prisma_migrations"
    ADD CONSTRAINT "_prisma_migrations_pkey" PRIMARY KEY ("id");

CREATE UNIQUE INDEX "User_username_key" ON "public"."User" USING "btree" ("username");

ALTER TABLE ONLY "public"."CustomerGroup"
    ADD CONSTRAINT "CustomerGroup_idStore_fkey" FOREIGN KEY ("idStore") REFERENCES "public"."Store"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."CustomerUser"
    ADD CONSTRAINT "CustomerUser_idCustomerGroup_fkey" FOREIGN KEY ("idCustomerGroup") REFERENCES "public"."CustomerGroup"("id") ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE ONLY "public"."CustomerUser"
    ADD CONSTRAINT "CustomerUser_idStore_fkey" FOREIGN KEY ("idStore") REFERENCES "public"."Store"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."ExpenditureCategory"
    ADD CONSTRAINT "ExpenditureCategory_idStore_fkey" FOREIGN KEY ("idStore") REFERENCES "public"."Store"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."Expenditures"
    ADD CONSTRAINT "Expenditures_idExpenditureCategory_fkey" FOREIGN KEY ("idExpenditureCategory") REFERENCES "public"."ExpenditureCategory"("id") ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE ONLY "public"."Expenditures"
    ADD CONSTRAINT "Expenditures_idSavingAccount_fkey" FOREIGN KEY ("idSavingAccount") REFERENCES "public"."SavingAccounts"("id") ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE ONLY "public"."Expenditures"
    ADD CONSTRAINT "Expenditures_idStore_fkey" FOREIGN KEY ("idStore") REFERENCES "public"."Store"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."MoneyTransfer"
    ADD CONSTRAINT "MoneyTransfer_fromSavingAccount_fkey" FOREIGN KEY ("fromSavingAccount") REFERENCES "public"."SavingAccounts"("id") ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE ONLY "public"."MoneyTransfer"
    ADD CONSTRAINT "MoneyTransfer_toSavingAccount_fkey" FOREIGN KEY ("toSavingAccount") REFERENCES "public"."SavingAccounts"("id") ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE ONLY "public"."Packaging"
    ADD CONSTRAINT "Packaging_idCustomerUser_fkey" FOREIGN KEY ("idCustomerUser") REFERENCES "public"."CustomerUser"("id") ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE ONLY "public"."Packaging"
    ADD CONSTRAINT "Packaging_idSales_fkey" FOREIGN KEY ("idSales") REFERENCES "public"."Sales"("id") ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE ONLY "public"."Packaging"
    ADD CONSTRAINT "Packaging_idStore_fkey" FOREIGN KEY ("idStore") REFERENCES "public"."Store"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."ProductCategories"
    ADD CONSTRAINT "ProductCategories_idProductCategories_fkey" FOREIGN KEY ("idProductCategories") REFERENCES "public"."ProductCategories"("id") ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE ONLY "public"."ProductCategories"
    ADD CONSTRAINT "ProductCategories_idStore_fkey" FOREIGN KEY ("idStore") REFERENCES "public"."Store"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."Product"
    ADD CONSTRAINT "Product_idProductCategories_fkey" FOREIGN KEY ("idProductCategories") REFERENCES "public"."ProductCategories"("id") ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE ONLY "public"."Product"
    ADD CONSTRAINT "Product_idStore_fkey" FOREIGN KEY ("idStore") REFERENCES "public"."Store"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."PurchaseOrder"
    ADD CONSTRAINT "PurchaseOrder_idProduct_fkey" FOREIGN KEY ("idProduct") REFERENCES "public"."Product"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."PurchaseOrder"
    ADD CONSTRAINT "PurchaseOrder_idPurchase_fkey" FOREIGN KEY ("idPurchase") REFERENCES "public"."Purchase"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."PurchaseOrder"
    ADD CONSTRAINT "PurchaseOrder_idStore_fkey" FOREIGN KEY ("idStore") REFERENCES "public"."Store"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."PurchaseReturnOrders"
    ADD CONSTRAINT "PurchaseReturnOrders_idProduct_fkey" FOREIGN KEY ("idProduct") REFERENCES "public"."Product"("id") ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE ONLY "public"."PurchaseReturnOrders"
    ADD CONSTRAINT "PurchaseReturnOrders_idPurchaseReturn_fkey" FOREIGN KEY ("idPurchaseReturn") REFERENCES "public"."PurchaseReturns"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."PurchaseReturnOrders"
    ADD CONSTRAINT "PurchaseReturnOrders_idStore_fkey" FOREIGN KEY ("idStore") REFERENCES "public"."Store"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."PurchaseReturns"
    ADD CONSTRAINT "PurchaseReturns_idSavingAccount_fkey" FOREIGN KEY ("idSavingAccount") REFERENCES "public"."SavingAccounts"("id") ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE ONLY "public"."PurchaseReturns"
    ADD CONSTRAINT "PurchaseReturns_idStore_fkey" FOREIGN KEY ("idStore") REFERENCES "public"."Store"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."PurchaseReturns"
    ADD CONSTRAINT "PurchaseReturns_idSupplier_fkey" FOREIGN KEY ("idSupplier") REFERENCES "public"."Supplier"("id") ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE ONLY "public"."Purchase"
    ADD CONSTRAINT "Purchase_idSavingAccount_fkey" FOREIGN KEY ("idSavingAccount") REFERENCES "public"."SavingAccounts"("id") ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE ONLY "public"."Purchase"
    ADD CONSTRAINT "Purchase_idStore_fkey" FOREIGN KEY ("idStore") REFERENCES "public"."Store"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."Purchase"
    ADD CONSTRAINT "Purchase_idSupplier_fkey" FOREIGN KEY ("idSupplier") REFERENCES "public"."Supplier"("id") ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE ONLY "public"."SaleOrder"
    ADD CONSTRAINT "SaleOrder_idProduct_fkey" FOREIGN KEY ("idProduct") REFERENCES "public"."Product"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."SaleOrder"
    ADD CONSTRAINT "SaleOrder_idSale_fkey" FOREIGN KEY ("idSale") REFERENCES "public"."Sales"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."SaleOrder"
    ADD CONSTRAINT "SaleOrder_idStore_fkey" FOREIGN KEY ("idStore") REFERENCES "public"."Store"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."SaleReturnOrders"
    ADD CONSTRAINT "SaleReturnOrders_idProduct_fkey" FOREIGN KEY ("idProduct") REFERENCES "public"."Product"("id") ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE ONLY "public"."SaleReturnOrders"
    ADD CONSTRAINT "SaleReturnOrders_idSaleReturn_fkey" FOREIGN KEY ("idSaleReturn") REFERENCES "public"."SaleReturns"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."SaleReturnOrders"
    ADD CONSTRAINT "SaleReturnOrders_idStore_fkey" FOREIGN KEY ("idStore") REFERENCES "public"."Store"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."SaleReturns"
    ADD CONSTRAINT "SaleReturns_idCustomerUser_fkey" FOREIGN KEY ("idCustomerUser") REFERENCES "public"."CustomerUser"("id") ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE ONLY "public"."SaleReturns"
    ADD CONSTRAINT "SaleReturns_idSavingAccount_fkey" FOREIGN KEY ("idSavingAccount") REFERENCES "public"."SavingAccounts"("id") ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE ONLY "public"."SaleReturns"
    ADD CONSTRAINT "SaleReturns_idStore_fkey" FOREIGN KEY ("idStore") REFERENCES "public"."Store"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."Sales"
    ADD CONSTRAINT "Sales_idCustomerUser_fkey" FOREIGN KEY ("idCustomerUser") REFERENCES "public"."CustomerUser"("id") ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE ONLY "public"."Sales"
    ADD CONSTRAINT "Sales_idSavingAccount_fkey" FOREIGN KEY ("idSavingAccount") REFERENCES "public"."SavingAccounts"("id") ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE ONLY "public"."Sales"
    ADD CONSTRAINT "Sales_idStore_fkey" FOREIGN KEY ("idStore") REFERENCES "public"."Store"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."SavingAccounts"
    ADD CONSTRAINT "SavingAccounts_idStore_fkey" FOREIGN KEY ("idStore") REFERENCES "public"."Store"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."Supplier"
    ADD CONSTRAINT "Supplier_idStore_fkey" FOREIGN KEY ("idStore") REFERENCES "public"."Store"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."User"
    ADD CONSTRAINT "User_idStore_fkey" FOREIGN KEY ("idStore") REFERENCES "public"."Store"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

REVOKE USAGE ON SCHEMA "public" FROM PUBLIC;

RESET ALL;
