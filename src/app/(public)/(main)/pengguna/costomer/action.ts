"use server"

import { cookies } from "next/headers"
import prisma from "../../../../../../prisma/database"
import { SearchParams } from "./page"
import { extension } from 'prisma-paginate'
import { revalidatePath } from "next/cache"

export const deleteData = async (id: Array<string>) => {
    try{
        await prisma.$transaction(async e => {
            for(let i of id){
                await e.customerUser.delete({
                    where: {
                        idStore: cookies().get('store')?.value,
                        id: i
                    }
                })
            }
        })

        revalidatePath('/', 'layout')
    }catch{
        throw new Error("Kesalahan saat menghapus data!")
    }
}

export const getAllData = async (searchParams: SearchParams) => {
    const getCountData = await prisma.customerUser.count({
        where: {
            idStore: cookies().get("store")?.value
        }
    })

    const extend = prisma.$extends(extension)
    return extend.customerUser.paginate({
        where: {
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
                {
                    address: {
                        contains: searchParams.search ?? '',
                        mode: 'insensitive'
                    }
                },
                {
                    customerGroup: {
                        name: {
                            contains: searchParams.search ?? '',
                            mode: 'insensitive'
                        }
                    }
                }
            ]
        },
        select: {
            id: true,
            customerGroup: {
                select: {
                    name: true
                }
            },
            name: true,
            email: true,
            noWa: true,
            address: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    }, {
        limit: searchParams.show ? searchParams.show == 'all' ? getCountData : parseInt(searchParams.show) : 10,
        page: searchParams.page ? parseInt(searchParams.page) : 1
    })
}