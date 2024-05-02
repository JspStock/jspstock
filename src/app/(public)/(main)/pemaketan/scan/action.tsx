"use server"

import { cookies } from "next/headers"
import prisma from "../../../../../../prisma/database"
import { revalidatePath } from "next/cache"

export const checkStatus = async (id: string) => await prisma.packaging.findUnique({
    where: {
        id: id,
        idStore: cookies().get('store')?.value
    },
    select: {
        status: true
    }
})

export const updateStatus = async (id: string) => {
    try{
        await prisma.packaging.update({
            where: {
                id: id,
                idStore: cookies().get('store')?.value
            },
            data: {
                status: "PICKUP"
            }
        })

        revalidatePath("/", "layout")
    }catch{
        throw new Error('Kesalahan pada server!')
    }
}