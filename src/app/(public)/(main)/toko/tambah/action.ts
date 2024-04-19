"use server"

import { Form } from "@/app/components/toko/form"
import prisma from "../../../../../../prisma/database"
import { revalidatePath } from "next/cache"

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

export const addData = async(form: Form) => {
    try{
        await prisma.store.create({
            data: {
                id: `STR_${Date.now()}`,
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