"use server"

import { cookies } from "next/headers";
import prisma from "../../../../../../../../prisma/database";
import { Form } from "@/app/components/pengguna/supplier/[supplier]/edit/form";
import { revalidatePath } from "next/cache";

export const getSupplierName = async(id: string) => await prisma.supplier.findUnique({
    where: {
        idStore: cookies().get('store')?.value,
        id: id
    },
    select: {
        name: true
    }
})

export const getSupplierData = async (id: string) => await prisma.supplier.findUnique({
    where: {
        idStore: cookies().get('store')?.value,
        id: id
    },
    select: {
        name: true,
        email: true,
        noWa: true,
        address: true,
        city: true,
        zipCode: true,
        region: true
    }
})

export const checkEmail = async (email: string) => await prisma.supplier.count({
    where: {
        idStore: cookies().get('store')?.value,
        email: email
    }
})

export const checkNoWa = async (noWa: string) => await prisma.supplier.count({
    where: {
        idStore: cookies().get('store')?.value,
        noWa: noWa
    }
})

export const updateSupplier = async (id: string, form: Form) => {
    try{
        await prisma.supplier.update({
            where: {
                idStore: cookies().get('store')?.value,
                id: id
            },
            data: form
        })

        revalidatePath('/', 'layout')
    }catch{
        throw new Error("Kesalahan saat mengupdate data!")
    }
}