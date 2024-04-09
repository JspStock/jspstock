"use server"

import { cookies } from "next/headers"
import prisma from "../../../../../../prisma/database"
import { extension } from "prisma-paginate"
import { SearchParams } from "./page"
import { revalidatePath } from "next/cache"

export const getAllData = async (searchParams: SearchParams) => {
    try{
        const getCountData = await prisma.savingAccounts.count({
            where: {
                idStore: cookies().get('store')?.value
            }
        })

        const extend = prisma.$extends(extension)
        return extend.savingAccounts.paginate({
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
                        name: {
                            contains: searchParams.search ?? '',
                            mode: 'insensitive'
                        }
                    },
                    {
                        startingBalance: {
                            lte: isNaN(parseInt(searchParams.search ?? '0')) ? undefined : parseInt(searchParams.search ?? '0')
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
            orderBy: {
                createdAt: 'desc'
            },
            select: {
                id: true,
                name: true,
                startingBalance: true,
                notes: true,
                createdAt: true
            }
        }, {
            limit: searchParams.show ? searchParams.show == 'all' ? getCountData : parseInt(searchParams.show) : 10,
            page: parseInt(searchParams.page ?? '1')
        })
    }catch{
        throw new Error("Kesalahan pada server!")
    }
}

export const deleteData = async (id: Array<string>) => {
    try{
        for(let i of id){
            await prisma.savingAccounts.delete({
                where: {
                    idStore: cookies().get('store')?.value,
                    id: i
                }
            })
        }

        revalidatePath("/", "layout")
    }catch{
        throw new Error("Kesalahan pada server!")
    }
}