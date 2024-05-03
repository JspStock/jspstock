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
        await prisma.$transaction(async e => {
            const storeId = cookies().get('store')?.value

            await e.expenditures.update({
                where: {
                    id: id,
                    idStore: storeId
                },
                data: {
                    idExpenditureCategory: form.expenditureCategory,
                    idSavingAccount: form.account,
                    total: form.totalExpenditure,
                    notes: form.note
                }
            })

            const transactionRecords = await e.transactionRecords.aggregate({
                where: {
                    idStore: storeId,
                    idSavingAccount: form.account,
                    NOT: {
                        reference: id
                    }
                },
                _sum: {
                    credit: true,
                    debit: true
                }
            })

            await e.transactionRecords.updateMany({
                where: {
                    reference: id,
                    idStore: storeId
                },
                data: {
                    credit: form.totalExpenditure,
                    saldo: ((transactionRecords._sum.debit ?? 0) - (transactionRecords._sum.credit ?? 0)) - form.totalExpenditure
                }
            })
        })

        revalidatePath("/", "layout")
    } catch {
        throw new Error("Kesalahan pada server!")
    }
}