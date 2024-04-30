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
        const storeId = cookies().get('store')?.value
        await prisma.$transaction(async e => {
            for(let i of id){
                const oldData = await e.sales.findUnique({
                    where: {
                        id: i,
                        idStore: storeId
                    },
                    select: {
                        saleOrder: {
                            select: {
                                qty: true,
                                product: {
                                    select: {
                                        id: true
                                    }
                                }
                            }
                        }
                    }
                })

                if(oldData){
                    await e.sales.delete({
                        where: {
                            idStore: storeId,
                            id: i
                        }
                    })
    
                    await e.transactionRecords.deleteMany({
                        where: {
                            idStore: storeId,
                            reference: i
                        }
                    })

                    for(let a of oldData.saleOrder){
                        const product = await e.product.findUnique({
                            where: {
                                idStore: storeId,
                                id: a.product.id
                            },
                            select: {
                                qty: true
                            }
                        })

                        if(product){
                            await e.product.update({
                                where: {
                                    idStore: storeId,
                                    id: a.product.id
                                },
                                data: {
                                    qty: product.qty + a.qty
                                }
                            })
                        }else{
                            throw new Error('Kesalahan pada server!')
                        }
                    }
    
                    await e.packaging.deleteMany({
                        where: {
                            idStore: storeId,
                            idSales: i
                        }
                    })

                    await Cloudinary.uploader.destroy(`${storeId}/sales/${i}`)
                }else{
                    throw new Error('Kesalahan pada server!')
                }
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