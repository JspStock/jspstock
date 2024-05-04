"use server"

import { extension } from "prisma-paginate"
import prisma from "../../../../../../prisma/database"
import { SearchParams } from "./page"
import { cookies } from "next/headers"
import { gte, lte } from "@/utils/utils"
import { Prisma } from "@prisma/client"

export type GetProductPayload = Prisma.ProductGetPayload<{
    select: {
        id: true,
        name: true,
        price: true,
        qty: true,
        cost: true,
        saleOrder: {
            select: {
                qty: true
            }
        },
        saleReturnOrders: {
            select: {
                qty: true
            }
        },
    },
}>

export const getProduct = async (searchParams: SearchParams) => {
    const extend = prisma.$extends(extension)
    const getCountData = await extend.product.count({
        where: {
            idStore: cookies().get('store')?.value,
            deletedAt: null
        }
    })

    return await extend.product.paginate({
        where: {
            idStore: cookies().get('store')?.value,
            deletedAt: null,
            createdAt: {
                lte: lte(searchParams),
                gte: gte(searchParams)
            },
            OR: [
                {
                    name: {
                        contains: searchParams.search ?? '',
                        mode: 'insensitive'
                    }
                },
                {
                    id: {
                        contains: searchParams.search ?? '',
                        mode: 'insensitive'
                    }
                }
            ]
        },
        select: {
            id: true,
            name: true,
            price: true,
            qty: true,
            cost: true,
            saleOrder: {
                select: {
                    qty: true
                }
            },
            saleReturnOrders: {
                select: {
                    qty: true
                }
            },
        },
        orderBy: {
            createdAt: 'desc'
        }
    }, {
        limit: searchParams.show ? searchParams.show == 'all' ? getCountData : parseInt(searchParams.show) : 10,
        page: parseInt(searchParams.page ?? '1')
    })
}