"use server"

import { cookies } from "next/headers"
import prisma from "../../../../../../../prisma/database"
import { Form } from "@/app/components/pengembalian/pembelian/tambah/form"
import { revalidatePath } from "next/cache"

export const getSupplier = async () => await prisma.supplier.findMany({
    where: {
        idStore: cookies().get('store')?.value
    },
    select: {
        id: true,
        name: true
    }
})

export const getSavingAccount = async () => await prisma.savingAccounts.findMany({
    where: {
        idStore: cookies().get('store')?.value
    },
    select: {
        id: true,
        name: true
    }
})

export const getProduct = async () => await prisma.product.findMany({
    where: {
        idStore: cookies().get('store')?.value,
        deletedAt: null
    },
    select: {
        id: true,
        name: true,
        price: true
    }
})

export const addData = async (form: Form) => {
    try{
        await prisma.purchaseReturns.create({
            data: {
                id: `RET_${Date.now()}`,
                idStore: cookies().get('store')!.value,
                idSavingAccount: form.savingAccounts,
                idSupplier: form.supplier,
                notes: form.notes,
                purchaseReturnOrders: {
                    createMany: {
                        data: form.order.map(e => ({
                            idStore: cookies().get('store')!.value,
                            qty: e.qty,
                            idProduct: e.id
                        }))
                    }
                },
            }
        })

        revalidatePath("/", "layout")
    }catch{
        throw new Error("Kesalahan pada server!")
    }
}