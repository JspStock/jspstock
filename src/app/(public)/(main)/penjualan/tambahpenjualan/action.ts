"use server"

import { cookies } from "next/headers"
import prisma from "../../../../../../prisma/database"
import { FormWithoutDocument } from "@/app/components/penjualan/tambahpenjualan/form"
import { revalidatePath } from "next/cache"
import { Prisma } from "@prisma/client"

export type GetProductPayload = Prisma.ProductGetPayload<{
    select: {
        id: true,
        name: true,
        price: true,
        qty: true
    }
}>
export const getProduct = async () => await prisma.product.findMany({
    where: {
        idStore: cookies().get('store')?.value,
        deletedAt: null
    },
    select: {
        id: true,
        name: true,
        price: true,
        qty: true
    }
})

export const getCustomerUser = async () => await prisma.customerUser.findMany({
    where: {
        idStore: cookies().get('store')?.value,
    },
    select: {
        id: true,
        name: true,
    }
})

export const getCountDataById = async (id: string) => await prisma.sales.count({
    where: {
        id: `SLS_${id}`,
        idStore: cookies().get('store')?.value
    }
})

export const getSavingAccounts = async () => await prisma.savingAccounts.findMany({
    where: {
        idStore: cookies().get('store')?.value
    },
    select: {
        id: true,
        name: true
    }
})

export const addData = async (form: FormWithoutDocument, file: string | null) => {
    try{
        

        revalidatePath("/", "layout")
    }catch(e){
        throw new Error("Kesalahan saat menambahkan data!")
    }
}