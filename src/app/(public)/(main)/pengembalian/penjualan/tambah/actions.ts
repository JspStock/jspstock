"use server"

import { cookies } from "next/headers"
import prisma from "../../../../../../../prisma/database"
import { Form } from "@/app/components/pengembalian/penjualan/tambah/form"
import { revalidatePath } from "next/cache"

export const getCustomerUser = async () => await prisma.customerUser.findMany({
    where: {
        idStore: cookies().get('store')?.value
    },
    select: {
        id: true,
        name: true,
    }
})

export const getProduct = async () => await prisma.product.findMany({
    where: {
        idStore: cookies().get('store')?.value,
        deletedAt: null
    },
    select: {
        id: true,
        name: true,
        price: true
    }
})

export const getSavingAccount = async () => await prisma.savingAccounts.findMany({
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
            const { id, saleReturnOrders } = await e.saleReturns.create({
                data: {
                    id: `RTS_${Date.now()}`,
                    idStore: storeId,
                    idCustomerUser: form.customer,
                    idSavingAccount: form.savingAccounts,
                    notes: form.notes,
                    saleReturnOrders: {
                        createMany: {
                            data: form.order.map(e => ({
                                idStore: storeId,
                                idProduct: e.id,
                                qty: e.qty
                            }))
                        }
                    }
                },
                select: {
                    id: true,
                    saleReturnOrders: {
                        select: {
                            qty: true,
                            product: {
                                select: {
                                    price: true
                                }
                            }
                        }
                    }
                }
            })

            for(let i of form.order){
                const product = await e.product.findUnique({
                    where: {
                        id: i.id,
                        idStore: storeId
                    },
                    select: {
                        qty: true
                    }
                })

                if(product){
                    await e.product.update({
                        where: {
                            id: i.id,
                            idStore: storeId,
                        },
                        data: {
                            qty: product.qty + i.qty
                        }
                    })
                }else{
                    throw new Error('Kesalahan pada server!')
                }
            }

            const sum = saleReturnOrders.map(a => a.qty * a.product!.price).reduce((val, prev) => val + prev)
            await e.transactionRecords.create({
                data: {
                    idStore: storeId,
                    idSavingAccount: form.savingAccounts,
                    credit: sum,
                    debit: 0,
                    reference: id,
                    description: 'Pengembalian penjualan'
                }
            })
        })

        revalidatePath('/', 'layout')
    }catch{
        throw new Error("Kesalahan pada seerver!")
    }
}