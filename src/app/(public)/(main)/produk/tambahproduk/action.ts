"use server"

import { cookies } from "next/headers"
import prisma from "../../../../../../prisma/database"
import Cloudinary from "@/utils/cloudinary"
import { revalidatePath } from "next/cache"
import { FormWithoutImage } from "@/app/components/product/tambahproduk/form"
import { Prisma } from "@prisma/client"

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
        idStore: cookies().get('store')?.value,
        code: code,
        deletedAt: null
    }
})

export type GetSupplierPayload = Prisma.SupplierGetPayload<{
    select: {
        id: true,
        name: true
    }
}>

export const getSupplier = async () => await prisma.supplier.findMany({
    where: {
        idStore: cookies().get('store')?.value
    },
    select: {
        id: true,
        name: true
    }
})

export const addProduct = async (form: FormWithoutImage, image: string) => {
    try{
        await prisma.$transaction(async e => {
            const storeId = cookies().get('store')!.value
            const resultProduct = await e.product.create({
                data: {
                    code: form.code,
                    idSupplier: form.idSupplier,
                    idStore: storeId,
                    name: form.name,
                    idProductCategories: form.category,
                    cost: form.cost,
                    price: form.price,
                    qty: form.qty,
                    imagePath: ''
                },
                select: {
                    id: true
                }
            })
            
            const { url } = await Cloudinary.uploader.upload(image, {
                public_id: `${storeId}/product/${resultProduct.id}`,
            })

            await e.product.update({
                where: {
                    id: resultProduct.id
                },
                data: {
                    imagePath: url
                }
            })
        }, {
            timeout: 100000
        })

        revalidatePath('/', 'layout')
    }catch(e){
        throw new Error("Kesalahan saat menambahkan produk!")
    }
}