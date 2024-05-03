"use server"

import { cookies } from "next/headers"
import { Form } from "@/app/components/pengembalian/pembelian/[purchaseReturn]/edit/form"
import { revalidatePath } from "next/cache"
import { Prisma } from "@prisma/client"
import prisma from "../../../../../../../../prisma/database"

export type GetPurchaseReturnPayload = Prisma.PurchaseReturnsGetPayload<{
    select: {
        id: true,
        idSavingAccount: true,
        idPurchase: true,
        notes: true
    }
}>

export const getPurchaseReturn = async (id: string) => await prisma.purchaseReturns.findUnique({
    where: {
        id: id,
        idStore: cookies().get('store')?.value
    },
    select: {
        id: true,
        idSavingAccount: true,
        idPurchase: true,
        notes: true
    }
})

export const getSavingAccount = async () => await prisma.savingAccounts.findMany({
    where: {
        idStore: cookies().get('store')?.value
    },
    select: {
        id: true,
        name: true
    }
})

export type GetPurchasePayload = Prisma.PurchaseGetPayload<{
    select: {
        id: true,
        total: true
    }
}>

export const getPurchase = async () => await prisma.purchase.findMany({
    where: {
        idStore: cookies().get('store')?.value,
    },
    select: {
        id: true,
        total: true
    }
})

export const updateData = async (idReturn: string, form: Form) => {
    try {
        await prisma.$transaction(async e => {
            const storeId = cookies().get('store')!.value

            const { id, purchase } = await e.purchaseReturns.update({
                where: {
                    id: idReturn,
                    idStore: storeId
                },
                data: {
                    idPurchase: form.purchase,
                    idSavingAccount: form.savingAccounts,
                    notes: form.notes,
                },
                select: {
                    id: true,
                    purchase: {
                        select: {
                            total: true
                        }
                    }
                }
            })

            const transactionRecords = await e.transactionRecords.aggregate({
                where: {
                    idStore: storeId,
                    idSavingAccount: form.savingAccounts,
                    NOT: {
                        reference: id
                    }
                },
                _sum: {
                    credit: true,
                    debit: true
                }
            })

            if(transactionRecords._sum.debit && transactionRecords._sum.credit){
                await e.transactionRecords.updateMany({
                    where: {
                        reference: id,
                        idStore: storeId
                    },
                    data: {
                        idStore: storeId,
                        credit: 0,
                        debit: purchase.total,
                        description: 'Pengembalian pembelian',
                        reference: id,
                        idSavingAccount: form.savingAccounts,
                        saldo: (transactionRecords._sum.debit - transactionRecords._sum.credit) + purchase.total
                    }
                })
            }else{
                throw new Error('Kesalahan pada server!')
            }
        })

        revalidatePath("/", "layout")
    } catch {
        throw new Error("Kesalahan pada server!")
    }
}