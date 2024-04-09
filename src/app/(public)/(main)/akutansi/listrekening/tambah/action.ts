"use server"

import { cookies } from "next/headers"
import prisma from "../../../../../../../prisma/database"
import { Form } from "@/app/components/akutansi/listrekening/tambah/form"
import { revalidatePath } from "next/cache"

export const getCountDataByNo = async (no: string) => await prisma.savingAccounts.count({
    where: {
        idStore: cookies().get('store')?.value,
        id: no
    },
})

export const addData = async (form: Form) => {
    try{
        await prisma.savingAccounts.create({
            data: {
                id: form.no,
                idStore: cookies().get('store')!.value,
                name: form.name,
                startingBalance: form.startingBalance,
                notes: form.notes
            }
        })

        revalidatePath("/", "layout")
    }catch{
        throw new Error("Kesalahan pada server!")
    }
}