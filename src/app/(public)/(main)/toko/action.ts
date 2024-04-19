"use server"

import { extension } from "prisma-paginate"
import prisma from "../../../../../prisma/database"
import { SearchParams } from "./page"
import { Prisma } from "@prisma/client"
import { revalidatePath } from "next/cache"

export type GetStorePayload = Prisma.StoreGetPayload<{
    select: {
        id: true,
        name: true,
        noWa: true,
        email: true,
        address: true,
        product: {
            select: {
                purchaseOrder: {
                    select: {
                        qty: true
                    }
                },
                saleOrder: {
                    select: {
                        qty: true
                    }
                },
                purchaseReturnOrders: {
                    select: {
                        qty: true,
                    }
                },
                saleReturnOrders: {
                    select: {
                        qty: true
                    }
                }
            }
        }
    },
}>
export const getStore = async (searchParams: SearchParams) => {
    const extend = prisma.$extends(extension)
    const getCountData = await extend.store.count()
    return await extend.store.paginate({
        where: {
            OR: [
                {
                    name: {
                        contains: searchParams.search ?? '',
                        mode: 'insensitive'
                    },
                },
                {
                    noWa: {
                        contains: searchParams.search ?? '',
                        mode: 'insensitive'
                    }
                },
                {
                    address: {
                        contains: searchParams.search ?? '',
                        mode: 'insensitive'
                    }
                },
            ],
        },
        select: {
            id: true,
            name: true,
            noWa: true,
            email: true,
            address: true,
            product: {
                where: {
                    deletedAt: null
                },
                select: {
                    purchaseOrder: {
                        select: {
                            qty: true
                        }
                    },
                    saleOrder: {
                        select: {
                            qty: true
                        }
                    },
                    purchaseReturnOrders: {
                        select: {
                            qty: true,
                        }
                    },
                    saleReturnOrders: {
                        select: {
                            qty: true
                        }
                    }
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    }, {
        limit: searchParams.show ? searchParams.show == 'all' ? getCountData : parseInt(searchParams.show) : 10,
        page: parseInt(searchParams.page ?? '1')
    })
}

export const deleteData = async (id: Array<string>) => {
    try{
        await prisma.$transaction(async e => {
            for(let i of id){
                await e.store.delete({
                    where: {
                        id: i
                    }
                })
            }
        })

        revalidatePath('/', 'layout')
    }catch{
        throw new Error('Kesalahan pada server!')
    }
}