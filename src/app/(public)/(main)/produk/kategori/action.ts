"use server"

import { cookies } from "next/headers"
import prisma from "../../../../../../prisma/database"
import { Category } from "@/app/components/product/kategori/table"


export const getCountCategoryData = async () => {
    const store = cookies()
    return await prisma.productCategories.count({
        where: {
            idStore: store.get('store')?.value
        }
    })
}

export const getAllCategories = async (show?: string, search?: string, page?: string) => {
    const store = cookies()
    const temp: Array<Category> = []
    const data = await prisma.productCategories.findMany({
        where: {
            idStore: store.get('store')?.value,
            name: {
                contains: search,
                mode: 'insensitive'
            },
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