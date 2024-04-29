"use server"

import { cookies } from "next/headers"
import prisma from "../../../../../../prisma/database"
import { SearchParams } from "./page"
import { extension } from 'prisma-paginate'
import Cloudinary from "@/utils/cloudinary"
import { revalidatePath } from "next/cache"
import { gte, lte } from "@/utils/utils"
import { Prisma } from "@prisma/client"

export const deleteData = async(id: Array<string>) => {
    try{
        await prisma.$transaction(async e => {
            for(let i of id){
                await e.sales.delete({
                    where: {
                        idStore: cookies().get('store')?.value,
                        id: i
                    }
                })

                await Cloudinary.uploader.destroy(`${cookies().get('store')?.value}/sales/${i}`)
            }
        })

        revalidatePath('/', 'layout')
    }catch{
        throw new Error("Terjadi kesalahan saat menghapus data!")
    }
}

export type GetDataPlayload = Prisma.SalesGetPayload<{
    select: {
        id: true,
        customerUser: {
            select: {
                name: true
            }
        },
        saleOrder: {
            select: {
                qty: true,
                product: {
                    select: {
                        price: true
                    }
                }
            }
        },
        discount: true,
        shippingCost: true,
        createdAt: true
    },
}>

export const getData = async (searchParams: SearchParams) => {
    try{
        const extend = prisma.$extends(extension)
        const getCountData  = await extend.sales.count({
            where: {
                idStore: cookies().get('store')?.value
            }
        })
        
        return await extend.sales.paginate({
            where: {
                idStore: cookies().get('store')?.value,
                createdAt: {
                    gte: gte(searchParams),
                    lte: lte(searchParams)
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
                ]
            },
            select: {
                id: true,
                customerUser: {
                    select: {
                        name: true
                    }
                },
                saleOrder: {
                    select: {
                        qty: true,
                        product: {
                            select: {
                                price: true
                            }
                        }
                    }
                },
                discount: true,
                shippingCost: true,
                createdAt: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        }, {
            limit: searchParams.show ? searchParams.show == 'all' ? getCountData : parseInt(searchParams.show) : 10,
            page: searchParams.page ? parseInt(searchParams.page) : 1
        })
    }catch(e){
        console.log(e)
        throw new Error("Kesalahan sata mengambil data!")
    }
}