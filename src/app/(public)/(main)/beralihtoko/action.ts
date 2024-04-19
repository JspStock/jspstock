"use server"

import { Form } from "@/app/components/beralihtoko/form";
import prisma from "../../../../../prisma/database";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const getAllStore = async () => await prisma.store.findMany({
    select: {
        id: true,
        name: true
    },
    orderBy: {
        name: 'asc'
    }
})

export const switchStore = async (form: Form) => {
    try{
        cookies().set('store', form.store!, {secure: true})
        revalidatePath("/", "layout")
    }catch{
        throw new Error('Kesalahan pada server')
    }
}