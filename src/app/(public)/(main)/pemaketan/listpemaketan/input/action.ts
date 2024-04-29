"use server"

import { cookies } from "next/headers"
import prisma from "../../../../../../../prisma/database"
import { FormWithoutFile } from "@/app/components/pemaketan/listpemaketan/input/form"
import { $Enums } from "@prisma/client"
import Cloudinary from "@/utils/cloudinary"
import { revalidatePath } from "next/cache"

export const getCustomerUser = async () => await prisma.customerUser.findMany({
    where: {
        idStore: cookies().get('store')?.value
    },
})

export const getSales = async () => await prisma.sales.findMany({
    where: {
        idStore: cookies().get('store')?.value
    },
    select: {
        id: true,
    }
})

export const addData = async (form: FormWithoutFile, file: string | null) => {
    try{
        await prisma.$transaction(async e => {
            const addResult = await e.packaging.create({
                data: {
                    id: `PKG_${Date.now()}`,
                    idCustomerUser: form.idCustomerUser,
                    idStore: cookies().get('store')!.value,
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