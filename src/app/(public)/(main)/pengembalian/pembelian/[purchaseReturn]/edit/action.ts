"use server"

import { cookies } from "next/headers"
import { Form } from "@/app/components/pengembalian/pembelian/tambah/form"
import { revalidatePath } from "next/cache"
import prisma from "../../../../../../../../prisma/database"

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

export const getPurchaseReturn = async (id: string) => await prisma.purchaseReturns.findUnique({
    where: {
        idStore: cookies().get('store')?.value,
        id: id
    },
    select: {
        id: true,
        idSupplier: true,
        purchaseReturnOrders: {
            select: {
                qty: true,
                product: {
                    select: {
                        id: true,
                        name: true,
                        price: true
                    }
                }
            }
        },
        idSavingAccount: true,
        notes: true
    }
})

export const updateData = async (id: string, form: Form) => {
    try{
        await prisma.purchaseReturns.update({
            where: {
                idStore: cookies().get('store')?.value,
                id: id
            },
            data: {
                id: `RET_${Date.now()}`,
                idStore: cookies().get('store')!.value,
                idSavingAccount: form.savingAccounts,
                idSupplier: form.supplier,
                notes: form.notes,
                purchaseReturnOrders: {
                    deleteMany: {},
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