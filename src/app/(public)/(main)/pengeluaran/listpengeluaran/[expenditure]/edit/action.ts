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
            const getData = await e.expenditures.findUnique({
                where: {
                    id: id,
                    idStore: cookies().get('store')?.value
                },
                select: {
                    total: true,
                    idSavingAccount: true,
                    savingAccount: {
                        select: {
                            startingBalance: true
                        }
                    }
                }
            })

            const generateBalance = (): number => {
                const balance = getData!.total
                let result = balance

                if(getData!.idSavingAccount == form.account){
                    if (form.totalExpenditure > balance) {
                        result -= (form.totalExpenditure - balance)
                    } else if (form.totalExpenditure < balance) {
                        result += (balance - form.totalExpenditure)
                    }
                }else{
                    result += getData!.savingAccount!.startingBalance
                }

                return result
            }

            await e.savingAccounts.update({
                where: {
                    id: getData?.idSavingAccount ?? undefined,
                    idStore: cookies().get('store')?.value
                },
                data: {
                    startingBalance: generateBalance()
                }
            })

            if(getData!.idSavingAccount != form.account){
                const currentBalance = await e.savingAccounts.findUnique({
                    where: {
                        id: form.account,
                        idStore: cookies().get('store')?.value
                    },
                    select: {
                        startingBalance: true
                    }
                })

                await e.savingAccounts.update({
                    where: {
                        id: form.account,
                        idStore: cookies().get('store')?.value
                    },
                    data: {
                        startingBalance: currentBalance!.startingBalance - form.totalExpenditure
                    }
                })
            }

            await e.expenditures.update({
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
        })

        revalidatePath("/", "layout")
    } catch {
        throw new Error("Kesalahan pada server!")
    }
}