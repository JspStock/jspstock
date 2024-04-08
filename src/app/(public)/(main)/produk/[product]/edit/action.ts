"use server"

import { cookies } from "next/headers"
import prisma from "../../../../../../../prisma/database"
import Cloudinary from "@/utils/cloudinary"
import { revalidatePath } from "next/cache"

export const getProductName = async (id: string) => await prisma.product.findFirst({
    where: {
        idStore: cookies().get('store')!.value,
        id: id
    },
    select: {
        name: true
    }
})

export const getProductCategories = async() => await prisma.productCategories.findMany({
    where: {
        idStore: cookies().get('store')?.value,
    },
    select: {
        id: true,
        name: true,
        idProductCategories: true
    }
})

export const checkProductCode = async (code: string) => await prisma.product.count({
    where: {
        idStore: cookies().get('store')!.value,
        id: `PROD_${code}`
    }
})

export const getProductData = async (id: string) => await prisma.product.findFirst({
    where: {
        idStore: cookies().get('store')!.value,
        id: id
    },
    select: {
        id: true,
        imagePath: true,
        name: true,
        idProductCategories: true,
        qty: true,
        price: true,
        cost: true
    }
})

export const updateProduct = async (form: FormData) => {
    try{
        const id = form.get('id') as string
        const code = form.get('code') as string
        const photo = form.get('image') as File
        const name = form.get('name') as string
        const category = form.get('category') as string
        const price = form.get('price') as string
        const cost = form.get('cost') as string

        await prisma.$transaction(async e => {
            const getId = await e.product.update({
                where: {
                    idStore: cookies().get('store')!.value!,
                    id: id
                },
                data: {
                    name: name,
                    id: `PROD_${code}`,
                    idProductCategories: category ?? null,
                    price: parseInt(price),
                    cost: parseInt(cost)
                },
                select: {
                    id: true
                }
            })

            if(form.has('image')){
                if(getId.id != id){
                    await Cloudinary.uploader.destroy(`${cookies().get('store')?.value}/product/${id}`)
                }

                const buffer = Buffer.from(await photo.arrayBuffer()).toString('base64')
                const resultUpload = await Cloudinary.uploader.upload(`data:${photo.type};base64,${buffer}`, {
                    public_id: `${cookies().get('store')!.value}/product/${getId.id}`
                })

                await e.product.update({
                    where: {
                        idStore: cookies().get('store')?.value,
                        id: getId.id
                    },
                    data: {
                        imagePath: resultUpload.url
                    }
                })
            }
        })

        revalidatePath('/', 'layout')
    }catch(e){
        throw new Error("kesalahan saat memeperbarui data!")
    }
}