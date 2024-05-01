"use server"

import { cookies } from "next/headers"
import prisma from "../../../../../../../prisma/database"
import { Form } from "@/app/components/pengembalian/pembelian/tambah/form"
import { revalidatePath } from "next/cache"
import { Prisma } from "@prisma/client"


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

export const addData = async (form: Form) => {
    try{
        await prisma.$transaction(async e => {
            const storeId = cookies().get('store')!.value

            const { id, purchase } = await e.purchaseReturns.create({
                data: {
                    id: `RET_${Date.now()}`,
                    idPurchase: form.purchase,
                    idStore: storeId,
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

            await e.transactionRecords.create({
                data: {
                    idStore: storeId,
                    credit: 0,
                    debit: purchase.total,
                    description: 'Pengembalian pembelian',
                    reference: id,
                    idSavingAccount: form.savingAccounts
                }
            })
        })

        revalidatePath("/", "layout")
    }catch{
        throw new Error("Kesalahan pada server!")
    }
}