"use server"

import { cookies } from "next/headers"
import prisma from "../../../../../../../prisma/database"
import { Form } from "@/app/components/akutansi/transfer/tambah/form"
import { revalidatePath } from "next/cache"

export const getSavingAccounts = async () => await prisma.savingAccounts.findMany({
    where: {
        idStore: cookies().get('store')?.value
    },
    select: {
        id: true,
        name: true
    }
})

export const addData = async (form: Form) => {
    try{
        await prisma.moneyTransfer.create({
            data: {
                id: `MTF_${Date.now()}`,
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