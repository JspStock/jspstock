"use server"

import { cookies } from "next/headers"
import prisma from "../../../../../../prisma/database"
import { SearchParams } from "./page"
import extensions from 'prisma-paginate'
import { revalidatePath } from "next/cache"
import Cloudinary from "@/utils/cloudinary"

export const deleteData = async ({ data }: { data: Array<string> }) => {
    try{
        await prisma.$transaction(async e => {
            for(let i of data){
                await e.purchase.delete({
                    where: {
                        idStore: cookies().get('store')?.value,
                        id: i
                    }
                })

                await Cloudinary.uploader.destroy(`${cookies().get('store')?.value}/purchase/${i}`)
            }
        })

        revalidatePath('/', 'layout')
    }catch{
        throw new Error("Kesalahan saat menghapus data!")
    }
}

export const getData = async ({ searchParams }: { searchParams: SearchParams }) => {
    const installExt = prisma.$extends(extensions)
    const getCount = await prisma.purchase.count()

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

    return await installExt.purchase.paginate({
        select: {
            id: true,
            supplier: {
                select: {
                    name: true,
                }
            },
            purchaseStatus: true,
            purchaseOrder: {
                select: {
                    qty: true,
                    product: {
                        select: {
                            cost: true,
                            name: true
                        }
                    }
                }
            },
            shippingCost: true,
            discount: true,
            createdAt: true
        },
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
                {
                    purchaseOrder: {
                        some: {
                            product: {
                                name: {
                                    contains: searchParams.search ?? '',
                                    mode: 'insensitive'
                                }
                            }
                        }
                    }
                },
            ],
            createdAt: {
                gte: gte(),
                lte: lte(),
            },
        },
        orderBy: {
            createdAt: 'desc'
        }
    }, {
        limit: searchParams.show ? searchParams.show == 'all' ? getCount : parseInt(searchParams.show) : 10,
        page: parseInt(searchParams.page ?? '1')
    })
}