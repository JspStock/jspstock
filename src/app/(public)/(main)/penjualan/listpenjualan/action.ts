"use server"

import { cookies } from "next/headers"
import prisma from "../../../../../../prisma/database"
import { SearchParams } from "./page"
import { extension } from 'prisma-paginate'
import Cloudinary from "@/utils/cloudinary"
import { revalidatePath } from "next/cache"

export const deleteData = async(id: Array<string>) => {
    try{
        await prisma.$transaction(async e => {
            for(let i of id){
                const getDataOld = await e.sales.findUnique({
                    where: {
                        idStore: cookies().get('store')?.value,
                        id: i
                    },
                    select: {
                        saleOrder: {
                            select: {
                                idProduct: true,
                                qty: true
                            }
                        }
                    }
                })

                for(let a of getDataOld!.saleOrder){
                    const getQtyProduct = await e.product.findUnique({
                        where: {
                            idStore: cookies().get('store')?.value,
                            id: a.idProduct
                        },
                        select: {
                            qty: true
                        }
                    })

                    await e.product.update({
                        where: {
                            idStore: cookies().get('store')?.value,
                            id: a.idProduct
                        },
                        data: {
                            qty: getQtyProduct!.qty + a.qty
                        }
                    })
                }

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

export const getData = async (searchParams: SearchParams) => {
    try{
        const getCountData  = await prisma.sales.count({
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

        const extend = prisma.$extends(extension)
        return await extend.sales.paginate({
            where: {
                idStore: cookies().get('store')?.value,
                createdAt: {
                    gte: gte(),
                    lte: lte()
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
                saleStatus: true,
                purchaseStatus: true,
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
    }catch{
        throw new Error("Kesalahan sata mengambil data!")
    }
}