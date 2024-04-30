"use server"

import { cookies } from "next/headers"
import { FormWithoutDocument } from "@/app/components/penjualan/tambahpenjualan/form"
import { revalidatePath } from "next/cache"
import { $Enums, Prisma } from "@prisma/client"
import prisma from "../../../../../../../../prisma/database"

export type GetDataPayload = Prisma.SalesGetPayload<{
    select: {
        id: true,
        saleOrder: {
            select: {
                qty: true,
                product: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        },
        idCustomerUser: true,
        idSavingAccount: true,
        discount: true,
        shippingCost: true,
        notes: true
    }
}>

export const getData = async (id: string) => await prisma.sales.findUnique({
    where: {
        idStore: cookies().get('store')?.value,
        id: id
    },
    select: {
        id: true,
        saleOrder: {
            select: {
                qty: true,
                product: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        },
        idCustomerUser: true,
        idSavingAccount: true,
        discount: true,
        shippingCost: true,
        notes: true
    }
})

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

export const updateData = async (id: string, form: FormWithoutDocument) => {
    try {
        const storeId = cookies().get('store')!.value

        await prisma.$transaction(async e => {
            const customer = await e.customerUser.findUnique({
                where: {
                    idStore: storeId,
                    id: form.customer
                },
                select: {
                    address: true
                }
            })

            const oldData = await e.sales.findUnique({
                where: {
                    idStore: storeId,
                    id: id
                },
                select: {
                    saleOrder: {
                        select: {
                            qty: true,
                            product: {
                                select: {
                                    id: true
                                }
                            }
                        }
                    }
                }
            })

            if (customer && oldData) {
                for(let i of oldData.saleOrder){
                    const product = await e.product.findUnique({
                        where: {
                            idStore: storeId,
                            id: i.product.id
                        },
                        select: {
                            qty: true
                        }
                    })

                    if(product){
                        await e.product.update({
                            where: {
                                idStore: storeId,
                                id: i.product.id
                            },
                            data: {
                                qty: product.qty + i.qty
                            }
                        })
                    }else{
                        throw new Error('Kesalahan pada server!')
                    }
                }

                const createSale = await e.sales.update({
                    where: {
                        idStore: storeId,
                        id
                    },
                    data: {
                        idCustomerUser: form.customer,
                        idSavingAccount: form.savingAccount,
                        discount: form.discount,
                        shippingCost: form.shippingCost,
                        notes: form.notes,
                        saleOrder: {
                            deleteMany: {},
                            createMany: {
                                data: form.order.map(a => ({
                                    idProduct: a.id,
                                    idStore: storeId,
                                    qty: parseInt(a.qty),
                                }))
                            },
                        },
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
                    } else {
                        throw new Error('Kesalahan pada server!')
                    }
                }

                const sumSale = ((form.shippingCost + createSale.saleOrder.map(a => a.qty * a.product.price).reduce((a, b) => a + b)) - form.discount)
                await e.transactionRecords.updateMany({
                    where: {
                        idStore: storeId,
                        reference: id
                    },
                    data: {
                        idStore: storeId,
                        reference: createSale.id,
                        credit: 0,
                        debit: sumSale,
                        description: `Melakukan penjualan\n${form.notes}`,
                        idSavingAccount: form.savingAccount
                    }
                })
            }
        })

        revalidatePath("/", "layout")
    } catch {
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