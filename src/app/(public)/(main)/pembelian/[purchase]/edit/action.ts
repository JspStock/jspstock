"use server"

import { cookies } from "next/headers";
import Cloudinary from "@/utils/cloudinary";
import { revalidatePath } from "next/cache";
import { FormWithoutDocument } from "@/app/components/pembelian/tambahpembelian/form";
import { $Enums, Prisma } from "@prisma/client";
import prisma from "../../../../../../../prisma/database";

export const getSupplierData = async () => await prisma.supplier.findMany({
    where: {
        idStore: cookies().get('store')?.value,
    },
    select: {
        id: true,
        name: true
    }
})

export const getSavingAccounts = async () => await prisma.savingAccounts.findMany({
    where: {
        idStore: cookies().get('store')?.value
    },
    select: {
        id: true,
        name: true
    }
})

export type GetPurchaseDataPayload = Prisma.PurchaseGetPayload<{
    select: {
        id: true,
        idSupplier: true,
        idSavingAccount: true,
        total: true,
        purchaseStatus: true,
        notes: true
    }
}>
export const getPurchaseData = async (id: string) => await prisma.purchase.findUnique({
    where: {
        idStore: cookies().get('store')?.value,
        id
    },
    select: {
        id: true,
        idSupplier: true,
        idSavingAccount: true,
        total: true,
        purchaseStatus: true,
        notes: true
    }
})

export const updatePurchase = async (idPurchase: string, form: FormWithoutDocument, document: string | null) => {
    try {
        await prisma.$transaction(async e => {
            const storeId = cookies().get('store')!.value

            const { id, total } = await e.purchase.update({
                where: {
                    idStore: storeId,
                    id: idPurchase
                },
                data: {
                    idStore: storeId,
                    purchaseStatus: form.purchaseStatus as $Enums.PurchaseStatus,
                    idSupplier: form.supplier,
                    idSavingAccount: form.savingAccount,
                    total: form.total,
                    notes: form.note
                },
                select: {
                    id: true,
                    total: true
                }
            })

            if (document) {
                const { url } = await Cloudinary.uploader.upload(document, {
                    public_id: `${storeId}/purchase/${id}`
                })

                await e.purchase.update({
                    where: {
                        idStore: storeId,
                        id
                    },
                    data: {
                        documentPath: url
                    }
                })
            }

            const transactionRecord = await e.transactionRecords.aggregate({
                where: {
                    idStore: storeId,
                    idSavingAccount: form.savingAccount,
                    NOT: {
                        reference: idPurchase
                    }
                },
                _sum: {
                    credit: true,
                    debit: true
                }
            })
            await e.transactionRecords.updateMany({
                where: {
                    idStore: storeId,
                    reference: idPurchase
                },
                data: {
                    reference: id,
                    idStore: storeId,
                    idSavingAccount: form.savingAccount,
                    description: `Menambahkan pembelian\n${form.note}`,
                    debit: 0,
                    credit: total,
                    saldo: ((transactionRecord._sum.debit ?? 0) - (transactionRecord._sum.credit ?? 0)) - total
                }
            })
        }, {
            timeout: 20000
        })

        revalidatePath("/", "layout")
    } catch {
        throw new Error("Kesalahan saat menambahkan data!")
    }
}