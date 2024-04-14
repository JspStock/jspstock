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
            for(let i of id){
                await e.saleReturns.delete({
                    where: {
                        idStore: cookies().get('store')?.value,
                        id: i
                    }
                })
            }
        })

        revalidatePath("/", "layout")
    }catch{
        throw new Error('Kesalahan pada server!')
    }
}