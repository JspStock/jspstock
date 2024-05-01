"use server"

import { extension } from "prisma-paginate"
import prisma from "../../../../../../prisma/database"
import { cookies } from "next/headers"
import { SearchParams } from "./page"
import { revalidatePath } from "next/cache"

export const getSaleReturns = async (searchParams: SearchParams) => {
    const extend = prisma.$extends(extension)
    const getCountData = await extend.saleReturns.count({
        where: {
            idStore: cookies().get('store')?.value
        }
    })

    return await extend.saleReturns.paginate({
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
                    customerUser: {
                        name: {
                            contains: searchParams.search ?? '',
                            mode: 'insensitive'
                        }
                    }
                },
            ]
        },
        select: {
            id: true,
            customerUser: {
                select: {
                    name: true
                }
            },
            saleReturnOrders: {
                select: {
                    qty: true,
                    product: {
                        select: {
                            price: true
                        }
                    }
                }
            },
            createdAt: true
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
                await e.transactionRecords.deleteMany({
                    where: {
                        idStore: storeId,
                        reference: i
                    }
                })

                const saleReturn = await e.saleReturns.findUnique({
                    where: {
                        id: i,
                        idStore: storeId
                    },
                    select: {
                        saleReturnOrders: {
                            select: {
                                qty: true,
                                product: {
                                    select: {
                                        id: true,
                                        qty: true
                                    }
                                }
                            }
                        }
                    }
                })

                if(saleReturn){
                    for(let a of saleReturn.saleReturnOrders){
                        const product = await e.product.findUnique({
                            where: {
                                id: a.product!.id,
                                idStore: storeId
                            },
                            select: {
                                qty: true
                            }
                        })

                        if(product){
                            const oldData = saleReturn.saleReturnOrders.find(e => e.qty)

                            if(oldData != undefined){
                                await e.product.update({
                                    where: {
                                        id: a.product!.id,
                                        idStore: storeId
                                    },
                                    data: {
                                        qty: product.qty - oldData.qty
                                    }
                                })
                            }else{
                                throw new Error('Kesalahan pada server!')
                            }
                        }else{
                            throw new Error('Kesalahan pada server!')
                        }
                    }
                }else{
                    throw new Error('Kesalahan pada server!')
                }

                await e.saleReturns.delete({
                    where: {
                        id: i,
                        idStore: storeId
                    }
                })
            }
        })

        revalidatePath("/", "layout")
    }catch{
        throw new Error('Kesalahan pada server!')
    }
}