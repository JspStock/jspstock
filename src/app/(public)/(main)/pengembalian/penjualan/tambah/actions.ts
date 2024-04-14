"use server"

import { cookies } from "next/headers"
import prisma from "../../../../../../../prisma/database"
import { Form } from "@/app/components/pengembalian/penjualan/tambah/form"
import { revalidatePath } from "next/cache"

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

export const addData = async (form: Form) => {
    try{
        await prisma.saleReturns.create({
            data: {
                id: `RTS_${Date.now()}`,
                idStore: cookies().get('store')!.value,
                idCustomerUser: form.customer,
                idSavingAccount: form.savingAccounts,
                notes: form.notes,
                saleReturnOrders: {
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