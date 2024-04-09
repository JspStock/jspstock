"use server"

import { cookies } from "next/headers"
import prisma from "../../../../../../../prisma/database"
import { Form } from "@/app/components/pengeluaran/kategori/tambah/form"
import { revalidatePath } from "next/cache"

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