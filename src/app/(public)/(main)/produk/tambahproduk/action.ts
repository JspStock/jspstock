"use server"

import { cookies } from "next/headers"
import prisma from "../../../../../../prisma/database"
import Cloudinary from "@/utils/cloudinary"
import { revalidatePath } from "next/cache"

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

export const addProduct = async (form: FormData) => {
    try{
        const image = form.get("image") as File
        const name = form.get('name') as string
        const categoryId = form.get('category') as string
        const price = form.get('price') as string
        const cost = form.get('cost') as string

        await prisma.$transaction(async e => {
            const getIdProduct = await e.product.create({
                data: {
                    idStore: cookies().get('store')!.value,
                    id: `PROD_${Date.now()}`,
                    name: name,
                    idProductCategories: categoryId,
                    price: parseInt(price),
                    cost: parseInt(cost),
                    imagePath: '',
                },
                select: {
                    id: true
                }
            })

            const buffer = Buffer.from(await image.arrayBuffer()).toString("base64")
            const resultUpload = await Cloudinary.uploader.upload(`data:${image.type};base64,${buffer}`, {
                public_id: `${cookies().get('store')!.value}/product/${getIdProduct.id}`
            })

            await e.product.update({
                where: {
                    idStore: cookies().get('store')!.value,
                    id: getIdProduct.id
                },
                data: {
                    imagePath: resultUpload.url
                }
            })
        })

        revalidatePath('/', 'layout')
    }catch(e){
        console.log(e)
        throw new Error("Kesalahan saat menambahkan produk!")
    }
}