"use server"

import { cookies } from "next/headers"
import prisma from "../../../../../../../../prisma/database"
import { revalidatePath } from "next/cache"

export const getCustomerGroupName = async (id: string) => await prisma.customerGroup.findUnique({
    where: {
        idStore: cookies().get('store')?.value,
        id: id
    },
    select: {
        name: true
    }
})

export const getCustomerGroupData = async (id: string) => await prisma.customerGroup.findUnique({
    where: {
        idStore: cookies().get('store')?.value,
        id: id
    },
    select: {
        id: true,
        name: true
    }
})

export const updateData = async (id: string, name: string) => {
    try{
        await prisma.customerGroup.update({
            where: {
                idStore: cookies().get('store')?.value,
                id: id
            },
            data: {
                name: name
            }
        })

        revalidatePath("/", "layout")
    }catch{
        throw new Error("Kesalahan saat mengupdate data!")
    }
}