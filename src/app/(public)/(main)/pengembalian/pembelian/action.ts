"use server"

import { extension } from "prisma-paginate"
import prisma from "../../../../../../prisma/database"
import { cookies } from "next/headers"
import { SearchParams } from "./page"
import { revalidatePath } from "next/cache"
import { Prisma } from "@prisma/client"

export type GetPurchaseReturnPayload = Prisma.PurchaseReturnsGetPayload<{
    select: {
        id: true,
        purchase: {
            select: {
                supplier: {
                    select: {
                        name: true
                    }
                },
                total: true
            }
        },
        createdAt: true
    }
}>

export const getPurchaseReturn = async (searchParams: SearchParams) => {
    const extend = prisma.$extends(extension)
    const getCountData = await extend.purchaseReturns.count({
        where: {
            idStore: cookies().get('store')?.value
        }
    })

    return await extend.purchaseReturns.paginate({
        where: {
            idStore: cookies().get('store')?.value,
            OR: [
                {
                    id: {
                        contains: searchParams.search ?? '',
                        mode: 'insensitive'
                    }
                },
                {
                    purchase: {
                        id: {
                            contains: searchParams.search ?? '',
                            mode: 'insensitive'
                        }
                    }
                },
                {
                    purchase: {
                        supplier: {
                            name: {
                                contains: searchParams.search ?? '',
                                mode: 'insensitive'
                            }
                        }
                    }
                },
                {
                    purchase: {
                        total: searchParams.search ? !Number.isNaN(parseInt(searchParams.search)) ? {
                            lte: parseInt(searchParams.search)
                        } : undefined : undefined
                    }
                }
            ],
        },
        orderBy: {
            createdAt: 'desc'
        },
        select: {
            id: true,
            purchase: {
                select: {
                    supplier: {
                        select: {
                            name: true
                        }
                    },
                    total: true
                }
            },
            createdAt: true
        }
    }, {
        limit: searchParams.show ? searchParams.show == 'all' ? getCountData : parseInt(searchParams.show) : 10,
        page: parseInt(searchParams.page ?? '1')
    })
}

export const deleteData = async (id: Array<string>) => {
    try{
        await prisma.$transaction(async e => {
            const storeId = cookies().get('store')?.value
            
            for(let i of id){
                await e.purchaseReturns.delete({
                    where: {
                        idStore: storeId,
                        id: i
                    }
                })

                await e.transactionRecords.deleteMany({
                    where: {
                        idStore: storeId,
                        reference: i
                    }
                })
            }
        })

        revalidatePath("/", "layout")
    }catch{
        throw new Error("Kesalahan pada server!")
    }
}