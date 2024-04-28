"use server"

import { cookies } from "next/headers"
import prisma from "../../../../../../../prisma/database"
import { Form } from "@/app/components/pengguna/costomer/tambah/form"
import { revalidatePath } from "next/cache"

export const getCountDataByNoWa = async (val: string) => await prisma.customerUser.count({
    where: {
        idStore: cookies().get('store')?.value,
        noWa: val
    }
})

export const getCustomerGroup = async () => await prisma.customerGroup.findMany({
    where: {
        idStore: cookies().get('store')?.value,
    },
    select: {
        id: true,
        name: true
    }
})

export const addData = async (form: Form) => {
    try{
        await prisma.customerUser.create({
            data: {
                id: `CUS_${Date.now()}`,
                idStore: cookies().get('store')!.value,
                idCustomerGroup: form.customerGroup,
                name: form.name,
                noWa: form.noWa,
                address: form.address,
            }
        })

        revalidatePath("/", "layout")
    }catch{
        throw new Error("Kesalahan saat menambahkan data!")
    }
}