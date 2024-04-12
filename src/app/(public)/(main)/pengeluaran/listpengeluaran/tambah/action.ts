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
            const getBalanceAccount = await e.savingAccounts.findUnique({
                where: {
                    id: form.account,
                    idStore: cookies().get('store')?.value
                },
                select: {
                    startingBalance: true
                }
            })

            await e.expenditures.create({
                data: {
                    id: `EXP_${Date.now()}`,
                    idStore: cookies().get('store')!.value,
                    idSavingAccount: form.account,
                    idExpenditureCategory: form.expenditureCategory,
                    total: form.totalExpenditure,
                    notes: form.note,
                }
            })

            await e.savingAccounts.update({
                where: {
                    id: form.account,
                    idStore: cookies().get('store')?.value
                },
                data: {
                    startingBalance: getBalanceAccount!.startingBalance - form.totalExpenditure
                }
            })
        })

        revalidatePath("/", "layout")
    }catch{
        throw new Error("Kesalahan pada server!")
    }
}