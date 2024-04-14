"use server"

import { cookies } from "next/headers"
import prisma from "../../../../../../prisma/database"
import { SearchParams } from "./page"
import { extension } from "prisma-paginate"
import { revalidatePath } from "next/cache"

export const getAllData = async (searchParams: SearchParams) => {
    const extend = prisma.$extends(extension)
    const getCountAllData = await extend.expenditures.count({
        where: {
            idStore: cookies().get('store')?.value
        }
    })

    const gte = () => {
        if (searchParams.date) {
            const from = searchParams.date.split("to")[0]
            const to = searchParams.date.split("to")[1]

            if (from != to) {
                const date = new Date(from)
                date.setDate(date.getDate() - 1)
                return date
            } else {
                return undefined
            }
        }

        return undefined
    }

    const lte = () => {
        if (searchParams.date) {
            const to = searchParams.date.split("to")[1]

            const date = new Date(to)
            return date
        }

        return undefined
    }

    return extend.expenditures.paginate({
        where: {
            idStore: cookies().get('store')?.value,
            createdAt: {
                lte: lte(),
                gte: gte()
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
            for (let i of id) {
                await e.expenditures.delete({
                    where: {
                        id: i,
                        idStore: cookies().get('store')?.value
                    }
                })
            }
        })

        revalidatePath('/', 'layout')
    } catch {
        throw new Error("Kesalahan pada server!")
    }
}