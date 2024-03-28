"use server"

import cloudinary from "@/utils/cloudinary"
import prisma from "../../../../../../../prisma/database"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

const store = cookies()

export const getProductCategories = async () => await prisma.productCategories.findMany({
    where: { 
        idStore: store.get('store')?.value,
     },
    select: {
        id: true,
        name: true,
        idProductCategories: true
    },
    orderBy: {
        name: 'asc',
    }
})

export const addCategory = async (form: FormData) => {
    try {
        const file = form.get("file") as File
        const name = form.get("name") as string
        const parent = form.get("parent") as string

        const id = await prisma.productCategories.create({
            data: {
                id: `KTG_${Date.now()}`,
                idProductCategories: parent,
                idStore: store.get('store')!.value,
                imagePath: '',
                name: name,
            },
            select: {
                id: true
            }
        })

        const buffer = Buffer.from(await file.arrayBuffer()).toString('base64')
        const uploadResult = await cloudinary.uploader.upload(`data:${file.type};base64,${buffer}`, {
            public_id: `${store.get('store')?.value}/product-categories/${id.id}`,
        })

        await prisma.productCategories.update({
            where: { id: id.id },
            data: {
                imagePath: uploadResult.url
            }
        })

        revalidatePath("/", "layout")
    } catch(e) {
        console.log(e)
        throw new Error("Kesalahan pada server!")
    }
}