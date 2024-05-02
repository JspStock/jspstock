"use server"

import { cookies } from "next/headers"
import { FormWithoutFile } from "@/app/components/pemaketan/listpemaketan/input/form"
import { $Enums, Prisma } from "@prisma/client"
import Cloudinary from "@/utils/cloudinary"
import { revalidatePath } from "next/cache"
import prisma from "../../../../../../../prisma/database"

export type GetCustomerUserPayload = Prisma.CustomerUserGetPayload<{
    select: {
        id: true,
        name: true,
        address: true,
        noWa: true
    }
}>
export const getCustomerUser = async () => await prisma.customerUser.findMany({
    where: {
        idStore: cookies().get('store')?.value
    },
    select: {
        id: true,
        name: true,
        address: true,
        noWa: true
    }
})

export const getSales = async () => await prisma.sales.findMany({
    where: {
        idStore: cookies().get('store')?.value,
        packaging: {
            every: {
                idSales: null
            }
        }
    },
    select: {
        id: true,
    }
})

export const getPackaging = async (id: string) => await prisma.packaging.findUnique({
    where: {
        id: id,
        idStore: cookies().get('store')?.value
    },
    select: {
        id: true,
        idSales: true,
        idCustomerUser: true,
        address: true,
        notes: true
    }
})

export const updateData = async (id: string, form: FormWithoutFile, file: string | null) => {
    try{
        await prisma.$transaction(async e => {
            const addResult = await e.packaging.update({
                where: {
                    id: id,
                    idStore: cookies().get('store')?.value
                },
                data: {
                    idCustomerUser: form.idCustomerUser,
                    idSales: form.idSale,
                    address: form.address,
                    status: $Enums.PackagingStatus.MENUNGGU_KURIR,
                    notes: form.notes
                },
                select: {
                    id: true
                }
            })

            if(file){
                const uploadResult = await Cloudinary.uploader.upload(file, {
                    public_id: `${cookies().get('store')?.value}/packaging/${addResult.id}`
                })

                await e.packaging.update({
                    where: {
                        idStore: cookies().get('store')?.value,
                        id: addResult.id
                    },
                    data: {
                        filePath: uploadResult.url
                    }
                })
            }
        })

        revalidatePath("/", "layout")
    }catch{
        throw new Error("Kesalahan pada server!")
    }
}