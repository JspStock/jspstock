"use server"

import cloudinary from "@/utils/cloudinary"
import prisma from "../../../../../../../../prisma/database"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"


export const getNameCategory = async (id: string) => await prisma.productCategories.findUnique({
    where: {
        id: id,
        idStore: cookies().get('store')?.value
    },
    select: {
        name: true
    }
})

export const getProductCategories = async (id: string) => {
    const store = cookies()
    return await prisma.productCategories.findMany({
        where: {
            idStore: store.get('store')?.value,
            id: {
                not: id,
            },
            idProductCategories: null
        },
        select: {
            id: true,
            name: true,
            idProductCategories: true,
        },
        orderBy: {
            name: 'asc',
        }
    })
}

export const getData = async (id: string) => await prisma.productCategories.findUnique({
    where: {
        idStore: cookies().get('store')?.value,
        id: id
    },
    select: {
        id: true,
        idProductCategories: true,
        name: true,
        imagePath: true
    }
})

export const updateData = async (form: FormData) => {
    try{
        const id = form.get("id") as string
        const file = form.get("file") as File | string
        const name = form.get("name") as string
        const parent = form.get('parent') as string

        await prisma.$transaction(async e => {
            await e.productCategories.update({
                where: {
                    id: id,
                    idStore: cookies().get('store')?.value
                },
                data: {
                    idProductCategories: parent,
                    name: name,
                }
            })
    
            if(form.has('file') && file != null && typeof file != "string"){
                const buffer = Buffer.from(await file.arrayBuffer()).toString('base64')
                const uploadResult = await cloudinary.uploader.upload(`data:${file.type};base64,${buffer}`, {
                    public_id: `${cookies().get('store')?.value}/product-categories/${id}`,
                })
                
                await e.productCategories.update({
                    where: {
                        id: id,
                        idStore: cookies().get('store')?.value,
                    },
                    data: {
                        imagePath: uploadResult.url
                    }
                })
            }
        })

        revalidatePath('/', 'layout')
    }catch(e){
        throw new Error("Kesalahan saat memperbarui data!")
    }
}