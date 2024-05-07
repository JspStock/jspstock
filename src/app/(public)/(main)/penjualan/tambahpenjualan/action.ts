"use server"

import { cookies } from "next/headers"
import prisma from "../../../../../../prisma/database"
import { FormWithoutDocument } from "@/app/components/penjualan/tambahpenjualan/form"
import { revalidatePath } from "next/cache"
import { $Enums, Prisma } from "@prisma/client"

export type GetProductPayload = Prisma.ProductGetPayload<{
    select: {
        id: true,
        code: true,
        name: true,
        price: true,
        qty: true
    }
}>
export const getProduct = async () => await prisma.product.findMany({
    where: {
        idStore: cookies().get('store')?.value,
        deletedAt: null
    },
    select: {
        id: true,
        code: true,
        name: true,
        price: true,
        qty: true
    }
})

export const getCustomerUser = async () => await prisma.customerUser.findMany({
    where: {
        idStore: cookies().get('store')?.value,
    },
    select: {
        id: true,
        name: true,
    }
})

export const getCountDataById = async (id: string) => await prisma.sales.count({
    where: {
        id: `SLS_${id}`,
        idStore: cookies().get('store')?.value
    }
})

export const getSavingAccounts = async () => await prisma.savingAccounts.findMany({
    where: {
        idStore: cookies().get('store')?.value
    },
    select: {
        id: true,
        name: true
    }
})

export const addData = async (form: FormWithoutDocument) => {
    try {
        const storeId = cookies().get('store')!.value

        await prisma.$transaction(async e => {
            const customer = await e.customerUser.findUnique({
                where: {
                    idStore: storeId,
                    id: form.customer
                },
                select: {
                    name: true,
                    address: true
                }
            })

            if(customer){
                const createSale = await e.sales.create({
                    data: {
                        id: `SLS_${Date.now()}`,
                        idStore: storeId,
                        idCustomerUser: form.customer,
                        idSavingAccount: form.savingAccount,
                        discount: form.discount,
                        shippingCost: form.shippingCost,
                        notes: form.notes,
                        saleOrder: {
                            createMany: {
                                data: form.order.map(a => ({
                                    idProduct: a.id,
                                    idStore: storeId,
                                    qty: parseInt(a.qty),
                                }))
                            },
                        },
                        packaging: {
                            create: {
                                id: `PKG_${Date.now()}`,
                                idStore: storeId,
                                idCustomerUser: form.customer,
                                address: `Pelanggan: ${customer.name}\n${customer.address}`,
                                status: $Enums.PackagingStatus.MENUNGGU_KURIR,
                            }
                        }
                    },
                    select: {
                        id: true,
                        saleOrder: {
                            select: {
                                idProduct: true,
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
    
                for (let i of createSale.saleOrder) {
                    const product = await e.product.findUnique({
                        where: {
                            idStore: storeId,
                            id: i.idProduct
                        },
                        select: {
                            qty: true
                        }
                    })
    
                    if (product) {
                        await e.product.update({
                            where: {
                                id: i.idProduct,
                                idStore: storeId
                            },
                            data: {
                                qty: product.qty - i.qty
                            }
                        })
                    }else{
                        throw new Error('Kesalahan pada server!')
                    }
                }

                const sumSale = ((createSale.saleOrder.map(a => a.qty * a.product.price).reduce((a, b) => a + b) + form.shippingCost) - form.discount)
                const transactionRecord = await e.transactionRecords.aggregate({
                    where: {
                        idStore: storeId,
                        idSavingAccount: form.savingAccount
                    },
                    _sum: {
                        credit: true,
                        debit: true
                    }
                })

                await e.transactionRecords.create({
                    data: {
                        idStore: storeId,
                        reference: createSale.id,
                        credit: 0,
                        debit: sumSale,
                        description: `Melakukan penjualan\n${form.notes}`,
                        idSavingAccount: form.savingAccount,
                        saldo: ((transactionRecord._sum.debit ?? 0) - (transactionRecord._sum.credit ?? 0)) + sumSale
                    }
                })
            }
        }, {
            timeout: 180000,
            maxWait: 180000
        })

        revalidatePath("/", "layout")
    } catch(e) {
        console.log(e)
        throw new Error("Kesalahan saat menambahkan data!")
    }
}

export type GetCustomerGroupPayload = Prisma.CustomerGroupGetPayload<{
    select: {
        id: true,
        name: true
    }
}>
export const getCustomerGroup = async () => await prisma.customerGroup.findMany({
    where: {
        idStore: cookies().get('store')?.value
    },
    select: {
        id: true,
        name: true
    }
})