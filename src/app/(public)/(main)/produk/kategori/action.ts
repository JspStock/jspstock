"use server"

import { cookies } from "next/headers"
import prisma from "../../../../../../prisma/database"
import { Category } from "@/app/components/product/kategori/table"
import { revalidatePath } from "next/cache"
import Cloudinary from "@/utils/cloudinary"


export const getCountCategoryData = async (search?: string) => {
    const store = cookies()
    return await prisma.productCategories.count({
        where: {
            idStore: store.get('store')?.value,
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
                    },
                },
        ]
        }
    })
}

export const getAllCategories = async (show?: string, search?: string, page?: string) => {
    const store = cookies()
    const temp: Array<Category> = []
    const data = await prisma.productCategories.findMany({
        where: {
            idStore: store.get('store')?.value,
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
                        },
                    },
            ]

        },
        take: show ? show == 'all' ? undefined : Number(show) : 10,
        skip: page ? Number(page) > 1 ? (parseInt(page) - 1) * (parseInt(show ?? '10')) : 0 : 0
    })

    for (const e of data) {
        if (e.idProductCategories) {
            const parent = await getParent(e.idProductCategories)
            temp.push({
                ...e, parent: {
                    name: parent?.name ?? 'N/A'
                }
            })
        } else {
            temp.push(e)
        }
    }

    return temp
}

export const getParent = async (idCategory: string) => {
    const store = cookies()
    return await prisma.productCategories.findUnique({
        where: {
            idStore: store.get("store")?.value,
            id: idCategory
        },
        select: {
            name: true
        }
    })
}

export const deleteCategories = async (idCategories: Array<string>) => {
    try{
        await prisma.$transaction(async e => {
            for(let i = 0; i < idCategories.length; i++){
                await e.productCategories.delete({
                    where: {
                        idStore: cookies().get("store")?.value,
                        id: idCategories[i]
                    }
                })

                await Cloudinary.uploader.destroy(`${cookies().get('store')?.value}/product-categories/${idCategories[i]}`)
            }
        })

        revalidatePath("/", "layout")
    }catch(e){
        throw new Error("Kesalahan saat menghapus kategori!")
    }
}