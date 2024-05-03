"use server"

import { extension } from "prisma-paginate"
import prisma from "../../../../../../prisma/database"
import { SearchParams } from "./page"
import { cookies } from "next/headers"
import { Prisma } from "@prisma/client"
import { revalidatePath } from "next/cache"

export type GetUserPayload = Prisma.UserGetPayload<{
    select: {
        id: true,
        name: true,
        email: true,
        noWa: true,
        role: true,
        status: true
    },
}>
export const getUser = async (searchParams: SearchParams) => {
    const extend = prisma.$extends(extension)
    const getCountData = await extend.user.count({
        where: {
            idStore: cookies().get('store')?.value
        }
    })

    return await extend.user.paginate({
        where: {
            OR: [
                {
                    AND: [
                        {
                            idStore: null
                        },
                        {
                            role: {
                                equals: 'OWNER'
                            }
                        },
                        {
                            OR: [
                                {
                                    name: {
                                        contains: searchParams.search ?? '',
                                        mode: 'insensitive'
                                    }
                                },
                                {
                                    email: {
                                        contains: searchParams.search ?? '',
                                        mode: 'insensitive'
                                    }
                                },
                                {
                                    noWa: {
                                        contains: searchParams.search ?? '',
                                        mode: 'insensitive'
                                    }
                                },
                            ]
                        }
                    ]
                },
                {
                    idStore: cookies().get('store')?.value,
                    OR: [
                        {
                            name: {
                                contains: searchParams.search ?? '',
                                mode: 'insensitive'
                            }
                        },
                        {
                            email: {
                                contains: searchParams.search ?? '',
                                mode: 'insensitive'
                            }
                        },
                        {
                            noWa: {
                                contains: searchParams.search ?? '',
                                mode: 'insensitive'
                            }
                        },
                    ]
                },
                
            ],
        },
        select: {
            id: true,
            name: true,
            email: true,
            noWa: true,
            role: true,
            status: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    }, {
        limit: searchParams.show ? searchParams.show == 'all' ? getCountData : parseInt(searchParams.show) : 10,
        page: parseInt(searchParams.page ?? '1')
    })
}

export const removeData = async (id: Array<string>) => {
    try{
        await prisma.$transaction(async e => {
            for(let i of id){
                await e.user.delete({
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