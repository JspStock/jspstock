"use server"

import { cookies } from "next/headers"
import prisma from "../../../../../../prisma/database"
import Cloudinary from "@/utils/cloudinary"
import { revalidatePath } from "next/cache"
import { extension } from "prisma-paginate"
import { SearchParams } from "./page"
import { Prisma } from "@prisma/client"

export const getSumAllProductQty = async () => await prisma.product.findMany({
    where: {
        idStore: cookies().get('store')?.value,
        deletedAt: null
    },
    select: {
        qty: true
    }
})

export type GetProductPayload = Prisma.ProductGetPayload<{
    select: {
        id: true,
        code: true,
        name: true,
        supplier: {
            select: {
                name: true
            }
        },
        productCategories: {
            select: {
                name: true,
            }
        },
        price: true,
        cost: true,
        imagePath: true,
        qty: true
    }
}>

export const getAllProduct = async (searchParams: SearchParams) => {
    const extend = prisma.$extends(extension)
    const getCountData = await extend.product.count({
        where: {
            idStore: cookies().get('store')?.value
        }
    })

    return await extend.product.paginate({
        where: {
            idStore: cookies().get('store')!.value,
            deletedAt: null,
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
                    code: {
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
                }
            ],
        },
        select: {
            id: true,
            name: true,
            code: true,
            supplier: {
                select: {
                    name: true
                }
            },
            productCategories: {
                select: {
                    name: true,
                }
            },
            price: true,
            cost: true,
            imagePath: true,
            qty: true
        }
    }, {
        limit: searchParams.show ? searchParams.show == 'all' ? getCountData : parseInt(searchParams.show) : 10,
        page: parseInt(searchParams.page ?? '1')
    })
}

export const deleteProducts = async (idProduct: Array<string>) => {
    try{
        await prisma.$transaction(async e => {
            for(let row of idProduct){
                await e.product.update({
                    where: {
                        idStore: cookies().get('store')!.value,
                        id: row
                    },
                    data: {
                        id: `DEL_${row}`,
                        deletedAt: new Date()
                    }
                })

                await Cloudinary.uploader.destroy(
                    `${cookies().get('store')!.value}/product/${row}`
                )
            }
        })

        revalidatePath('/', 'layout')
    }catch{
        throw new Error("Kesalahan saat mengahapus produk")
    }
}