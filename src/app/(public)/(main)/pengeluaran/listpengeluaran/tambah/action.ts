"use server"

import { cookies } from "next/headers"
import prisma from "../../../../../../../prisma/database"
import { FormState } from "@/app/components/pengeluaran/listpengeluaran/tambah/form"
import { revalidatePath } from "next/cache"

export const getExpenditureCategory = async () => await prisma.expenditureCategory.findMany({
    where: {
        idStore: cookies().get('store')?.value,
    },
    select: {
        id: true,
        name: true,
        createdAt: true
    },
    orderBy: {
        createdAt: 'desc'
    }
})

export const getSavingAccounts = async () => await prisma.savingAccounts.findMany({
    where: {
        idStore: cookies().get('store')?.value
    },
    select: {
        id: true,
        name: true,
        startingBalance: true,
        createdAt: true
    },
    orderBy: {
        createdAt: 'desc'
    }
})

export const addData = async (form: FormState) => {
    try{
        await prisma.$transaction(async e => {
            const storeId = cookies().get('store')!.value

            const {id} = await e.expenditures.create({
                data: {
                    id: `EXP_${Date.now()}`,
                    idStore: storeId,
                    idSavingAccount: form.account,
                    idExpenditureCategory: form.expenditureCategory,
                    total: form.totalExpenditure,
                    notes: form.note,
                },
                select: {
                    id: true,
                }
            })

            const transactionRecords = await e.transactionRecords.aggregate({
                where: {
                    idStore: storeId,
                    idSavingAccount: form.account
                },
                _sum: {
                    credit: true,
                    debit: true
                }
            })

            await e.transactionRecords.create({
                data: {
                    idStore: storeId,
                    idSavingAccount: form.account!,
                    credit: form.totalExpenditure,
                    debit: 0,
                    reference: id,
                    description: `Penambahan pengeluaran`,
                    saldo: ((transactionRecords._sum.debit ?? BigInt(0)) - (transactionRecords._sum.credit ?? BigInt(0))) - BigInt(form.totalExpenditure)
                }
            })
        })

        revalidatePath("/", "layout")
    }catch{
        throw new Error("Kesalahan pada server!")
    }
}