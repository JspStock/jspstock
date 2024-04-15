"use server"

import { cookies } from "next/headers"
import { Form } from "@/app/components/akutansi/transfer/tambah/form"
import { revalidatePath } from "next/cache"
import prisma from "../../../../../../../../prisma/database"

export const getSavingAccounts = async () => await prisma.savingAccounts.findMany({
    where: {
        idStore: cookies().get('store')?.value
    },
    select: {
        id: true,
        name: true
    }
})

export const updateData = async (id: string, form: Form) => {
    try{
        await prisma.moneyTransfer.update({
            where: {
                id: id,
                idStore: cookies().get('store')?.value
            },
            data: {
                idStore: cookies().get('store')!.value,
                fromSavingAccount: form.from,
                toSavingAccount: form.to,
                total: form.total
            }
        })

        revalidatePath("/", "layout")
    }catch{
        throw new Error("Kesalahan pada server!")
    }
}

export const getMoneyTransfer = async (id: string) => await prisma.moneyTransfer.findUnique({
    where: {
        id: id,
        idStore: cookies().get('store')?.value
    },
    select: {
        id: true,
        fromSavingAccount: true,
        toSavingAccount: true,
        total: true
    }
})