"use server"

import prisma from "../../../../../../prisma/database"
import { extension } from 'prisma-paginate'
import { SearchParams } from "./page"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

export const getAllData = async (searchParams: SearchParams) => {
    try{
        const extend = prisma.$extends(extension)
        const getAllCountData = await prisma.customerGroup.count({
            where: {
                idStore: cookies().get('store')?.value
            }
        })

        return await extend.customerGroup.paginate({
            where: {
                idStore: cookies().get('store')?.value
            },
            select: {
                id: true,
                name: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        },{
            limit: searchParams.show ? searchParams.show == 'all' ? getAllCountData : parseInt(searchParams.show) : 10,
            page: searchParams.page ? parseInt(searchParams.page) : 1
        })
    }catch{
        throw new Error("Kesalahan saat mengambil data!")
    }
}

export const removeData = async (id: Array<string>) => {
    try{
        await prisma.$transaction(async e => {
            for(let i of id){
                await e.customerGroup.delete({
                    where: {
                        idStore: cookies().get('store')?.value,
                        id: i
                    }
                })
            }
        })

        revalidatePath("/", "layout")
    }catch{
        throw new Error("Kesalahan saat menghapus data!")
    }
}