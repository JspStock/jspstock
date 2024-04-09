"use server"

import { cookies } from "next/headers"
import prisma from "../../../../../../prisma/database"
import { SearchParams } from "./page"
import { extension } from "prisma-paginate"
import { revalidatePath } from "next/cache"

export const deleteData = async(id: Array<string>) => {
    try{
        for(let i of id){
            await prisma.expenditureCategory.delete({
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

export const getAllData = async (searchParams: SearchParams) => {
    try{
        const getCountData = await prisma.expenditureCategory.count({
            where: {
                idStore: cookies().get('store')?.value
            }
        })

        const extend = prisma.$extends(extension)
        return await extend.expenditureCategory.paginate({
            where: {
                idStore: cookies().get('store')?.value,
                OR: [
                    {
                        id: {
                            contains: searchParams.search ? `KGR_${searchParams.search}` : '',
                            mode: 'insensitive'
                        },
                    },
                    {
                        name: {
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
            }
        }, {
            limit: searchParams.show ? searchParams.show == 'all' ? getCountData : parseInt(searchParams.show) : 10,
            page:   parseInt(searchParams.page ?? '1')
        })
    }catch{
        throw new Error("Kesalahan pada server")
    }
}