"use server"

import { cookies } from "next/headers";
import prisma from "../../../../../../prisma/database";
import { Order } from "@/app/components/pembelian/tambahpembelian/tabletambahpembelian";
import Cloudinary from "@/utils/cloudinary";
import { revalidatePath } from "next/cache";
import { $Enums } from "@prisma/client";

export const getProductData = async () => await prisma.product.findMany({
    where: {
        idStore: cookies().get('store')?.value,
        deletedAt: null
    },
    select: {
        id: true,
        name: true,
        qty: true,
        price: true
    }
})

export const getSupplierData = async () => await prisma.supplier.findMany({
    where: {
        idStore: cookies().get('store')?.value,
    },
    select: {
        id: true,
        name: true
    }
})

export const addPurchase = async (form: FormData) => {
    try {
        const order = form.get('order') as string
        const document = form.get('document') as File
        const supplier = form.get('supplier') as string | null
        const purchaseStatus = form.get('purchaseStatus') as $Enums.PurchaseStatus
        const discount = form.get('discount') as string | null
        const shippingCost = form.get('shippingCost') as string | null
        const note = form.get('note') as string | null
        const parseOrder = JSON.parse(order) as Array<Order>

        await prisma.$transaction(async e => {
            const idPurchase = await e.purchase.create({
                data: {
                    id: `PUR_${Date.now()}`,
                    idStore: cookies().get('store')!.value,
                    idSupplier: supplier,
                    discount: discount ? parseInt(discount) : undefined,
                    shippingCost: shippingCost ? parseInt(shippingCost) : undefined,
                    notes: note,
                    purchaseStatus: $Enums.PurchaseStatus[purchaseStatus],
                    purchaseOrder: {
                        createMany: {
                            data: parseOrder.map(val => ({
                                idStore: cookies().get('store')!.value,
                                idProduct: val.id,
                                qty: val.selectQty,
                            }))
                        },
                    }
                },
                select: {
                    id: true,
                },
            })

            for(let i of parseOrder){
                await e.product.updateMany({
                    where: {
                        idStore: cookies().get('store')?.value,
                        id: i.id
                    },
                    data: {
                        qty: i.qty + i.selectQty
                    }
                })
            }

            if (document != null) {
                const buffer = Buffer.from(await document.arrayBuffer()).toString("base64")
                const resultUpload = await Cloudinary.uploader.upload(`data:${document.type};base64,${buffer}`, {
                    public_id: `${cookies().get('store')?.value}/purchase/${idPurchase.id}`
                })

                await e.purchase.update({
                    where: {
                        id: idPurchase.id,
                        idStore: cookies().get('store')?.value
                    },
                    data: {
                        documentPath: resultUpload.url
                    }
                })
            }
        })

        revalidatePath("/", "layout")
    } catch(e) {
        throw new Error("Kesalahan saat menambahkan data!")
    }
}