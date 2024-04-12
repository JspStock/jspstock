"use server"

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import prisma from "../../../../../../../../prisma/database"

export const getData = async (id: string) => await prisma.expenditureCategory.findUnique({
    where: {
        idStore: cookies().get('store')?.value,
        id: id
    },
    select: {
        name: true
    }
})

export const updateData = async ({ id, name }: {id: string, name: string}) => {
    try{
        await prisma.expenditureCategory.update({
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
        throw new Error("Kesalahan pada server!")
    }
}