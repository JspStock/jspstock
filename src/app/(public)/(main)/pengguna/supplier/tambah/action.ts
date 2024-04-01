"use server"

import { Form } from "@/app/components/pengguna/supplier/tambah/form";
import prisma from "../../../../../../../prisma/database";
import { cookies } from "next/headers";

export const checkEmail = async (email: string) => await prisma.supplier.count({
    where: {
        idStore: cookies().get('store')?.value,
        email: email.toString()
    }
})

export const checkNoWa = async (noWa: string) => await prisma.supplier.count({
    where: {
        idStore: cookies().get('store')?.value,
        noWa: noWa.toString()
    }
})

export const createSupplier = async (form: Form) => {
    try{
        await prisma.supplier.create({
            data: {
                id: `CUS_${Date.now()}`,
                idStore: cookies().get('store')!.value,
                name: form.name,
                email: form.email,
                noWa: form.noWa.toString(),
                address: form.address,
                city: form.city,
                zipCode: form.zipCode.toString(),
                region: form.region
            }
        })
    }catch{
        throw new Error("Kesalahan saat menambahkan Supplier!")
    }
}