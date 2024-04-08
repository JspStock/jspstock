"use server"

import { cookies } from "next/headers"
import prisma from "../../../../../../../../prisma/database"
import { Form } from "@/app/components/pengguna/costomer/[customer]/edit/form"
import { revalidatePath } from "next/cache"

export const getCountDataByEmail = async (val: string) => await prisma.customerUser.count({
    where: {
        idStore: cookies().get('store')?.value,
        email: val
    }
})

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

export const getCustomerName = async (id: string) => await prisma.customerUser.findUnique({
    where: {
        idStore: cookies().get('store')?.value,
        id: id
    },
    select: {
        name: true
    }
})

export const getCustomerData = async (id: string) => await prisma.customerUser.findUnique({
    where: {
        idStore: cookies().get('store')?.value,
        id: id
    },
    select: {
        id: true,
        idCustomerGroup: true,
        name: true,
        email: true,
        noWa: true,
        address: true,
        city: true,
        zipCode: true,
        region: true
    }
})

export const updateData = async (id: string, data: Form) => {
    try{
        await prisma.customerUser.update({
            where: {
                idStore: cookies().get('store')?.value,
                id: id
            },
            data: {
                name: data.name,
                email: data.email,
                noWa: data.noWa,
                address: data.address,
                city: data.city,
                zipCode: data.zipCode,
                region: data.region
            }
        })

        revalidatePath("/", "layout")
    }catch{
        throw new Error("Kesalahan saat memperbarui data!")
    }
}