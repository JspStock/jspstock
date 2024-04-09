"use server"

import { cookies } from "next/headers"
import prisma from "../../../../../../../prisma/database"
import { Form } from "@/app/components/pengeluaran/kategori/tambah/form"
import { revalidatePath } from "next/cache"

export const getCountDataById = async (code: string) => await prisma.expenditureCategory.count({
    where: {
        idStore: cookies().get('store')?.value,
        id: `KGR_${code}`
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