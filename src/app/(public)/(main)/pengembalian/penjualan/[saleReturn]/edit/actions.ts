"use server"

import { cookies } from "next/headers"
import { Form } from "@/app/components/pengembalian/penjualan/tambah/form"
import { revalidatePath } from "next/cache"
import prisma from "../../../../../../../../prisma/database"
import { SaleReturn } from "./page"

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

export const getData = async (id: string) => await prisma.saleReturns.findUnique({
    where: {
        idStore: cookies().get('store')?.value,
        id: id
    },
    select: {
        id: true,
        idCustomerUser: true,
        idSavingAccount: true,
        notes: true,
        saleReturnOrders: {
            select: {
                idProduct: true,
                qty: true
            }
        }
    }
})

export const updateData = async (idSaleReturn: string, form: Form, olData: SaleReturn) => {
    try{
        await prisma.$transaction(async e => {
            const storeId = cookies().get('store')!.value

            for(let i of olData.saleReturnOrders){
                const product = await e.product.findUnique({
                    where: {
                        id: i.idProduct!,
                        idStore: storeId
                    },
                    select: {
                        qty: true
                    }
                })

                if(product){
                    await e.product.update({
                        where: {
                            id: i.idProduct!,
                            idStore: storeId,
                        },
                        data: {
                            qty: product.qty - i.qty
                        }
                    })
                }
            }

            const { id, saleReturnOrders } = await e.saleReturns.update({
                where: {
                    id: idSaleReturn,
                    idStore: storeId
                },
                data: {
                    idCustomerUser: form.customer,
                    idSavingAccount: form.savingAccounts,
                    notes: form.notes,
                    saleReturnOrders: {
                        deleteMany: {},
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
            await e.transactionRecords.updateMany({
                where: {
                    reference: idSaleReturn,
                    idStore: storeId
                },
                data: {
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