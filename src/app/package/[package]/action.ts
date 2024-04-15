"use server"

import { $Enums } from "@prisma/client"
import prisma from "../../../../prisma/database"
import { revalidatePath } from "next/cache"

export const getPackage = async (id: string) => await prisma.packaging.findUnique({
    where: {
        id: id
    },
    select: {
        id: true,
        address: true,
        status: true
    }
})

export const updateStatus = async (id: string) => {
    try{
        await prisma.packaging.update({
            where: {
                id: id
            },
            data: {
                status: $Enums.PackagingStatus.TERKIRIM
            }
        })

        revalidatePath("/", "layout")
    }catch{
        throw new Error("Kesalahan pada server!")
    }
}