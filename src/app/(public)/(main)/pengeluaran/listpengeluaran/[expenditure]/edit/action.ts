"use server"

import { cookies } from "next/headers"
import { FormState } from "@/app/components/pengeluaran/listpengeluaran/tambah/form"
import { revalidatePath } from "next/cache"
import prisma from "../../../../../../../../prisma/database"

export const getData = async (id: string) => await prisma.expenditures.findUnique({
    where: {
        id: id,
        idStore: cookies().get('store')?.value
    },
    select: {
        id: true,
        idExpenditureCategory: true,
        idSavingAccount: true,
        total: true,
        notes: true
    }
})

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

export const updateData = async (id: string, form: FormState) => {
    try {
        await prisma.expenditures.update({
            where: {
                id: id,
                idStore: cookies().get('store')?.value
            },
            data: {
                idExpenditureCategory: form.expenditureCategory,
                idSavingAccount: form.account,
                total: form.totalExpenditure,
                notes: form.note
            }
        })

        revalidatePath("/", "layout")
    } catch {
        throw new Error("Kesalahan pada server!")
    }
}