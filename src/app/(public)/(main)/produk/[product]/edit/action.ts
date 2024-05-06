"use server"

import { cookies } from "next/headers"
import Cloudinary from "@/utils/cloudinary"
import { revalidatePath } from "next/cache"
import { FormWithoutImage } from "@/app/components/product/tambahproduk/form"
import prisma from "../../../../../../../prisma/database"
import { Prisma } from "@prisma/client"

export const getProductName = async (id: string) => await prisma.product.findUnique({
    where: {
        idStore: cookies().get('store')!.value,
        id: id
    },
    select: {
        name: true
    }
})

export type GetProductDataPayload = Prisma.ProductGetPayload<{
    select: {
        id: true,
        code: true,
        name: true,
        idSupplier: true,
        idProductCategories: true,
        cost: true,
        price: true,
        qty: true
    }
}>
export const getProductData = async (id: string) => prisma.product.findUnique({
    where: {
        idStore: cookies().get('store')?.value,
        id
    },
    select: {
        id: true,
        code: true,
        name: true,
        idSupplier: true,
        idProductCategories: true,
        cost: true,
        price: true,
        qty: true
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

export const getProductCategories = async () => await prisma.productCategories.findMany({
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

export const updateProduct = async (id: string, form: FormWithoutImage, image: string | null) => {
    try {
        await prisma.$transaction(async e => {
            const storeId = cookies().get('store')!.value

            const resultProduct = await e.product.update({
                where: {
                    id
                },
                data: {
                    code: form.code,
                    idStore: storeId,
                    name: form.name,
                    idSupplier: form.idSupplier,
                    idProductCategories: form.category,
                    cost: form.cost,
                    price: form.price,
                    qty: form.qty,
                },
                select: {
                    id: true
                }
            })

            if(image){
                const { url } = await Cloudinary.uploader.upload(image, {
                    public_id: `${storeId}/product/${resultProduct.id}`
                })
    
                await e.product.update({
                    where: {
                        id: resultProduct.id
                    },
                    data: {
                        imagePath: url
                    }
                })
            }
        }, {
            timeout: 100000,
            maxWait: 100000
        })

        revalidatePath('/', 'layout')
    } catch {
        throw new Error("Kesalahan saat menambahkan produk!")
    }
}