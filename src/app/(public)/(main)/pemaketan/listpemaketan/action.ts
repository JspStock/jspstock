"use server"

import { extension } from "prisma-paginate"
import prisma from "../../../../../../prisma/database"
import { cookies } from "next/headers"
import { SearchParams } from "./page"
import Cloudinary from "@/utils/cloudinary"
import { revalidatePath } from "next/cache"

export const getPackaging = async (searchParams: SearchParams) => {
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

    const extend = prisma.$extends(extension)
    const getCountData = await extend.packaging.count({
        where: {
            idStore: cookies().get('store')?.value
        }
    })

    return await extend.packaging.paginate({
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
                {
                    address: {
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
            customerUser: {
                select: {
                    name: true
                }
            },
            address: true,
            status: true,
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
                await e.packaging.delete({
                    where: {
                        idStore: cookies().get('store')?.value,
                        id: i
                    }
                })

                await Cloudinary.uploader.destroy(`${cookies().get('store')?.value}/packaging/${i}`)
            }
        })

        revalidatePath("/", "layout")
    }catch{
        throw new Error('Kesalahan pada server!')
    }
}