-- CreateTable
CREATE TABLE "PermissionPassword" (
    "id" TEXT NOT NULL,
    "idStore" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "PermissionPassword_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PermissionPassword" ADD CONSTRAINT "PermissionPassword_idStore_fkey" FOREIGN KEY ("idStore") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;
