"use server"

import { extension } from "prisma-paginate"
import prisma from "../../../../../../prisma/database"
import { cookies } from "next/headers"
import { SearchParams } from "./page"
import { revalidatePath } from "next/cache"

export const getMoneyTransfer = async (searchParams: SearchParams) => {
    const extend = prisma.$extends(extension)
    const getCountData = await extend.moneyTransfer.count({
        where: {
            idStore: cookies().get('store')?.value
        }
    })

    return await extend.moneyTransfer.paginate({
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
                    fromSavingAccountRelation: {
                        OR: [
                            {
                                id: {
                                    contains: searchParams.search ?? '',
                                    mode: 'insensitive'
                                }
                            },
                            {
                                name: {
                                    contains: searchParams.search ?? '',
                                    mode: 'insensitive'
                                }
                            }
                        ]
                    }
                },
                {
                    toSavingAccountRelation: {
                        OR: [
                            {
                                id: {
                                    contains: searchParams.search ?? '',
                                    mode: 'insensitive'
                                }
                            },
                            {
                                name: {
                                    contains: searchParams.search ?? '',
                                    mode: 'insensitive'
                                }
                            }
                        ]
                    }
                },
                {
                    total: {
                        equals: searchParams.search ? !isNaN(parseInt(searchParams.search)) ? parseInt(searchParams.search) : undefined : undefined
                    }
                }
            ]
        },
        select: {
            id: true,
            fromSavingAccountRelation: {
                select: {
                    id: true,
                    name: true
                }
            },
            toSavingAccountRelation: {
                select: {
                    id: true,
                    name: true
                }
            },
            total: true,
            createdAt: true,
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
            const storeId = cookies().get('store')?.value

            for(let i of id){
                await e.moneyTransfer.delete({
                    where: {
                        idStore: storeId,
                        id: i
                    }
                })

                await e.transactionRecords.deleteMany({
                    where: {
                        reference: i,
                        idStore: storeId
                    }
                })
            }
        })

        revalidatePath("/", "layout")
    }catch{
        throw new Error("Kesalahan pada server!")
    }
}