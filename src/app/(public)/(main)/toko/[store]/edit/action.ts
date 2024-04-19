"use server"

import { Form } from "@/app/components/toko/form"
import { revalidatePath } from "next/cache"
import prisma from "../../../../../../../prisma/database"
import { Prisma } from "@prisma/client"

export const checkCountDataByNoWa = async (value: string) => await prisma.store.count({
    where: {
        noWa: value
    }
})

export const checkCountDataByEmail = async (value: string) => await prisma.store.count({
    where: {
        email: value
    }
})

export const getNameStore = async (id: string) => await prisma.store.findUnique({
    where: {
        id
    },
    select: {
        name: true
    }
})


export type GetStoreDataPayload = Prisma.StoreGetPayload<{
    select: {
        id: true,
        name: true,
        noWa: true,
        email: true,
        address: true
    }
}>

export const getStoreData = async (id: string) => await prisma.store.findUnique({
    where: {
        id
    },
    select: {
        id: true,
        name: true,
        noWa: true,
        email: true,
        address: true
    }
})

export const updateData = async(id: string, form: Form) => {
    try{
        await prisma.store.update({
            where: {
                id
            },
            data: {
                name: form.name,
                email: form.email,
                noWa: form.noWa,
                address: form.address
            }
        })

        revalidatePath('/', 'layout')
    }catch{
        throw new Error('Kesalahan pada server!')
    }
}