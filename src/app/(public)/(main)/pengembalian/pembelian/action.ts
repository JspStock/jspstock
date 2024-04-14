"use server"

import { extension } from "prisma-paginate"
import prisma from "../../../../../../prisma/database"
import { cookies } from "next/headers"
import { SearchParams } from "./page"
import { revalidatePath } from "next/cache"

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
                    supplier: {
                        name: {
                            contains: searchParams.search ?? '',
                            mode: 'insensitive'
                        }
                    }
                },
            ],
        },
        orderBy: {
            createdAt: 'desc'
        },
        select: {
            id: true,
            supplier: {
                select: {
                    name: true
                }
            },
            purchaseReturnOrders: {
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
                await e.purchaseReturns.delete({
                    where: {
                        idStore: cookies().get('store')?.value,
                        id: i
                    }
                })
            }
        })

        revalidatePath("/", "layout")
    }catch{
        throw new Error("Kesalahan pada server!")
    }
}