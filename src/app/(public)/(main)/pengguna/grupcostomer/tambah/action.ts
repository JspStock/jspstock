"use server"

import { cookies } from "next/headers";
import prisma from "../../../../../../../prisma/database";
import { revalidatePath } from "next/cache";

export const createCustomerGroup = async (name: string) => {
    try{
        await prisma.customerGroup.create({
            data: {
                idStore: cookies().get('store')!.value,
                id: `CGS_${Date.now()}`,
                name: name
            }
        })

        revalidatePath("/", 'layout')
    }catch{
        throw new Error("Kesalahan saat menambahkan data!")
    }
}