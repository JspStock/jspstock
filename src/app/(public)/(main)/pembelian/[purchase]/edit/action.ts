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

            const resultSavingAccount = await e.savingAccounts.findUnique({
                where: {
                    idStore: storeId,
                    id: form.savingAccount
                },
                select: {
                    startingBalance: true
                }
            })

            if (resultSavingAccount) {
                const resultPurchase = await e.purchase.findMany({
                    where: {
                        idStore: storeId,
                        idSavingAccount: form.savingAccount,
                        NOT: {
                            id: idPurchase
                        }
                    },
                    select: {
                        total: true
                    }
                })

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

                const totalBalance = resultSavingAccount.startingBalance - ((resultPurchase.length > 0 ? resultPurchase.map(e => e.total).reduce((val, prev) => val + prev) : 0) + total)
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
                        debit: total,
                        credit: 0,
                        balance: totalBalance
                    }
                })
            } else {
                throw new Error('Tidak dapat menemukan Rekening!')
            }
        }, {
            timeout: 20000
        })

        revalidatePath("/", "layout")
    } catch {
        throw new Error("Kesalahan saat menambahkan data!")
    }
}