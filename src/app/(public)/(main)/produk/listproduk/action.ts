"use server"

import { cookies } from "next/headers"
import prisma from "../../../../../../prisma/database"
import Cloudinary from "@/utils/cloudinary"
import { revalidatePath } from "next/cache"

export const getCountProduct = async (search?: string) => await prisma.product.count({
    where: {
        idStore: cookies().get('store')!.value,
        OR: [
            {
                id: {
                    contains: search ?? '',
                    mode: 'insensitive'
                }
            },
            {
                name: {
                    contains: search ?? '',
                    mode: 'insensitive'
                }
            }
        ],
    },
})

export const getAllProduct = async ({ show, search, page }: { show?: number | string, search?: string, page?: number }) => await prisma.product.findMany({
    where: {
        idStore: cookies().get('store')!.value,
        OR: [
            {
                id: {
                    contains: search ?? '',
                    mode: 'insensitive'
                }
            },
            {
                name: {
                    contains: search ?? '',
                    mode: 'insensitive'
                }
            }
        ],
    },
    take: show ? show == 'all' ? undefined : parseInt(show.toString()) : 10,
    skip: page ? page > 1 ? (page - 1) * (parseInt(show ? show.toString() : '10')) : 0 : 0,
    select: {
        id: true,
        name: true,
        productCategories: {
            select: {
                name: true
            }
        },
        qty: true,
        price: true,
        cost: true,
        imagePath: true
    }
})

export const deleteProducts = async (idProduct: Array<string>) => {
    try{
        await prisma.$transaction(async e => {
            for(let row of idProduct){
                await e.product.delete({
                    where: {
                        idStore: cookies().get('store')!.value,
                        id: row
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