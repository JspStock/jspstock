"use server"

import { cookies } from "next/headers"
import prisma from "../../../../../../prisma/database"
import { SearchParams } from "./page"
import { extension } from "prisma-paginate"
import { revalidatePath } from "next/cache"
import { gte, lte } from "@/utils/utils"

export const getAllData = async (searchParams: SearchParams) => {
    const extend = prisma.$extends(extension)
    const getCountAllData = await extend.expenditures.count({
        where: {
            idStore: cookies().get('store')?.value
        }
    })

    return extend.expenditures.paginate({
        where: {
            idStore: cookies().get('store')?.value,
            createdAt: {
                lte: lte(searchParams),
                gte: gte(searchParams)
            },
            OR: [
                {
                    id: {
                        contains: searchParams.search ?? '',
                        mode: 'insensitive'
                    },
                },
                {
                    expenditureCategory: {
                        name: {
                            contains: searchParams.search ?? '',
                            mode: 'insensitive'
                        },
                    }
                },
                {
                    total: {
                        equals: searchParams.search ? isNaN(parseInt(searchParams.search)) ? undefined : parseInt(searchParams.search) : undefined
                    }
                },
                {
                    notes: {
                        contains: searchParams.search ?? '',
                        mode: 'insensitive'
                    }
                }
            ]
        },
        select: {
            id: true,
            expenditureCategory: {
                select: {
                    name: true
                }
            },
            total: true,
            notes: true,
            createdAt: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    }, {
        limit: searchParams.show ? searchParams.show == 'all' ? getCountAllData : parseInt(searchParams.show) : 10,
        page: parseInt(searchParams.page ?? '1')
    })
}

export const deleteData = async (id: Array<string>) => {
    try {
        await prisma.$transaction(async e => {
            const storeId = cookies().get('store')?.value

            for (let i of id) {
                await e.expenditures.delete({
                    where: {
                        id: i,
                        idStore: storeId
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

        revalidatePath('/', 'layout')
    } catch {
        throw new Error("Kesalahan pada server!")
    }
}