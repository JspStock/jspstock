"use server"

import { cookies } from "next/headers"
import { Form } from "@/app/components/pengembalian/penjualan/tambah/form"
import { revalidatePath } from "next/cache"
import prisma from "../../../../../../../../prisma/database"

export const getCustomerUser = async () => await prisma.customerUser.findMany({
    where: {
        idStore: cookies().get('store')?.value
    },
    select: {
        id: true,
        name: true,
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

export const getSavingAccount = async () => await prisma.savingAccounts.findMany({
    where: {
        idStore: cookies().get('store')?.value
    },
    select: {
        id: true,
        name: true
    }
})

export const getData = async (id: string) => await prisma.saleReturns.findUnique({
    where: {
        idStore: cookies().get('store')?.value,
        id: id
    },
    select: {
        id: true,
        idCustomerUser: true,
        idSavingAccount: true,
        notes: true,
        saleReturnOrders: {
            select: {
                idProduct: true,
                qty: true
            }
        }
    }
})

export const updateData = async (id: string, form: Form) => {
    try{
        await prisma.saleReturns.update({
            where: {
                idStore: cookies().get('store')?.value,
                id: id
            },
            data: {
                id: `RTS_${Date.now()}`,
                idStore: cookies().get('store')!.value,
                idCustomerUser: form.customer,
                idSavingAccount: form.savingAccounts,
                notes: form.notes,
                saleReturnOrders: {
                    deleteMany: {},
                    createMany: {
                        data: form.order.map(e => ({
                            idStore: cookies().get('store')!.value,
                            idProduct: e.id,
                            qty: e.qty
                        }))
                    }
                }
            }
        })

        revalidatePath('/', 'layout')
    }catch{
        throw new Error("Kesalahan pada seerver!")
    }
}