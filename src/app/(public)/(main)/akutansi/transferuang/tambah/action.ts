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
        await prisma.$transaction(async e => {
            const storeId = cookies().get('store')!.value

            const {id} = await e.moneyTransfer.create({
                data: {
                    id: `MTF_${Date.now()}`,
                    idStore: storeId,
                    fromSavingAccount: form.from,
                    toSavingAccount: form.to,
                    total: form.total
                },
                select: {
                    id: true
                }
            })

            await e.transactionRecords.createMany({
                data: [
                    {
                        idSavingAccount: form.from,
                        idStore: storeId,
                        reference: id,
                        credit: form.total,
                        debit: 0,
                        description: "Transfer uang"
                    },
                    {
                        idSavingAccount: form.to,
                        idStore: storeId,
                        reference: id,
                        credit: 0,
                        debit: form.total,
                        description: "Menerima uang"
                    }
                ]
            })
        })

        revalidatePath("/", "layout")
    }catch{
        throw new Error("Kesalahan pada server!")
    }
}