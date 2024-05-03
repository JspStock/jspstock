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
        await prisma.$transaction(async e => {
            const storeId = cookies().get('store')!.value

            await e.moneyTransfer.update({
                where: {
                    id: id,
                    idStore: storeId
                },
                data: {
                    fromSavingAccount: form.from,
                    toSavingAccount: form.to,
                    total: form.total
                }
            })

            const [transactionRecordsFrom, transactionRecordsTo] = await Promise.all([
                e.transactionRecords.aggregate({
                    where: {
                        idStore: storeId,
                        idSavingAccount: form.from,
                        NOT: {
                            reference: id
                        }
                    },
                    _sum: {
                        credit: true,
                        debit: true
                    }
                }),

                e.transactionRecords.aggregate({
                    where: {
                        idStore: storeId,
                        idSavingAccount: form.to,
                        NOT: {
                            reference: id
                        }
                    },
                    _sum: {
                        credit: true,
                        debit: true
                    }
                })
            ])

            if(transactionRecordsFrom._sum.debit != null && transactionRecordsFrom._sum.credit != null && transactionRecordsTo._sum.debit != null && transactionRecordsTo._sum.credit != null){
                await e.transactionRecords.updateMany({
                    where: {
                        reference: id,
                        idSavingAccount: form.from,
                        idStore: storeId
                    },
                    data: {
                        idSavingAccount: form.from,
                        credit: form.total,
                        debit: 0,
                        description: "Transfer uang",
                        saldo: (transactionRecordsFrom._sum.debit - transactionRecordsFrom._sum.credit) - form.total
                    },
                })

                await e.transactionRecords.updateMany({
                    where: {
                        reference: id,
                        idSavingAccount: form.to,
                        idStore: storeId
                    },
                    data: {
                        idSavingAccount: form.to,
                        credit: 0,
                        debit: form.total,
                        description: "Menerima uang",
                        saldo: (transactionRecordsTo._sum.debit - transactionRecordsTo._sum.credit) + form.total
                    }
                })
            }else{
                throw new Error('Kesalahan pada server!')
            }
        })

        revalidatePath("/", "layout")
    }catch(e){
        console.log(e)
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