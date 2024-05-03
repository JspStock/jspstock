"use server"

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import prisma from "../../../../../../../../prisma/database"
import { Form } from "@/app/components/akutansi/listrekening/[account]/edit/form"

export const getCountDataByNo = async (no: string) => await prisma.savingAccounts.count({
    where: {
        idStore: cookies().get('store')?.value,
        id: no
    },
})

export const getNameData = async (id: string) => await prisma.savingAccounts.findUnique({
    where: {
        idStore: cookies().get('store')?.value,
        id: id
    },
    select: {
        name: true
    }
})

export const getData = async (id: string) => await prisma.savingAccounts.findUnique({
    where: {
        idStore: cookies().get('store')?.value,
        id: id
    },
    select: {
        id: true,
        name: true,
        startingBalance: true,
        notes: true
    }
})

export const updateData = async (id: string, form: Form) => {
    try{
        await prisma.$transaction(async e => {
            const storeId = cookies().get('store')?.value

            await e.savingAccounts.update({
                where: {
                    idStore: storeId,
                    id: id
                },
                data: {
                    id: form.no,
                    name: form.name,
                    notes: form.notes,
                    startingBalance: form.startingBalance
                }
            })

            await e.transactionRecords.updateMany({
                where: {
                    idSavingAccount: form.no,
                    idStore: storeId,
                },
                data: {
                    debit: form.startingBalance,
                    saldo: form.startingBalance
                }
            })
        })

        revalidatePath("/", "layout")
    }catch{
        throw new Error("Kesalahan pada server!")
    }
}