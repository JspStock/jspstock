"use server"

import { cookies } from "next/headers"
import { Form } from "@/app/components/pengeluaran/kategori/tambah/form"
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

export const addData = async (data: Form) => {
    try{
        await prisma.expenditureCategory.create({
            data: {
                id: `KGR_${Date.now()}`,
                idStore: cookies().get('store')!.value,
                name: data.name
            }
        })

        revalidatePath("/", "layout")
    }catch{
        throw new Error("Kesalan pada server!")
    }
}