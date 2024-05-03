"use server"

import { cookies } from "next/headers"
import prisma from "../../../../../../../prisma/database"
import { Form } from "@/app/components/akutansi/listrekening/tambah/form"
import { revalidatePath } from "next/cache"

export const getCountDataByNo = async (no: string) => await prisma.savingAccounts.count({
    where: {
        idStore: cookies().get('store')?.value,
        id: no
    },
})

export const addData = async (form: Form) => {
    try{
        await prisma.$transaction(async e => {
            const storeId = cookies().get('store')!.value

            const createSavingAccount = await e.savingAccounts.create({
                data: {
                    id: form.no,
                    idStore: storeId,
                    name: form.name,
                    startingBalance: form.startingBalance,
                    notes: form.notes
                },
                select: {
                    id: true
                }
            })

            await e.transactionRecords.create({
                data: {
                    idStore: storeId,
                    debit: form.startingBalance,
                    credit: 0,
                    description: 'Mutasi awal',
                    reference: "-",
                    saldo: form.startingBalance,
                    idSavingAccount: createSavingAccount.id
                }
            })
        })

        revalidatePath("/", "layout")
    }catch(e){
        throw new Error("Kesalahan pada server!")
    }
}