"use server"

import { cookies } from "next/headers"
import prisma from "../../../../../../../prisma/database"
import { $Enums } from "@prisma/client"
import { Order } from "@/app/components/pembelian/[purchase]/edit/tabletambahpembelian"
import Cloudinary from "@/utils/cloudinary"
import { revalidatePath } from "next/cache"

export const getProductData = async () => await prisma.product.findMany({
    where: {
        idStore: cookies().get('store')?.value,
        deletedAt: null
    },
    select: {
        id: true,
        name: true,
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

export const getSavingAccounts = async () => await prisma.savingAccounts.findMany({
    where: {
        idStore: cookies().get('store')?.value
    },
    select: {
        id: true,
        name: true
    }
})

export const getPurchaseData = async (id: string) => await prisma.purchase.findUnique({
    where: {
        idStore: cookies().get('store')?.value,
        id: id
    },
    select: {
        id: true,
        idSavingAccount: true,
        purchaseOrder: {
            select: {
                id: true,
                idProduct: true,
                qty: true,
                product: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                    }
                }
            }
        },
        supplier: {
            select: {
                id: true,
                name: true
            }
        },
        documentPath: true,
        purchaseStatus: true,
        discount: true,
        shippingCost: true,
        notes: true
    }
})

export const updatePurchase = async (form: FormData) => {
    try {
        const id = form.get('id') as string
        const order = form.get('order') as string
        const document = form.get('document') as File
        const supplier = form.get('supplier') as string | null
        const purchaseStatus = form.get('purchaseStatus') as $Enums.PurchaseStatus
        const discount = form.get('discount') as string | null
        const shippingCost = form.get('shippingCost') as string | null
        const note = form.get('note') as string | null
        const parseOrder = JSON.parse(order) as Array<Order>

        await prisma.$transaction(async e => {
            const purchase = await e.purchase.update({
                where: {
                    idStore: cookies().get('store')?.value,
                    id: id
                },
                data: {
                    idSupplier: supplier,
                    discount: discount ? parseInt(discount) : undefined,
                    shippingCost: shippingCost ? parseInt(shippingCost) : undefined,
                    notes: note,
                    purchaseStatus: $Enums.PurchaseStatus[purchaseStatus],
                    purchaseOrder: {
                        deleteMany: {},
                        createMany: {
                            data: parseOrder.map(e => ({
                                idProduct: e.id,
                                idStore: cookies().get('store')!.value,
                                qty: e.selectQty,
                            }))
                        }
                    },
                },
                select: {
                    id: true,
                },
            })

            if (document != null) {
                const buffer = Buffer.from(await document.arrayBuffer()).toString("base64")
                const resultUpload = await Cloudinary.uploader.upload(`data:${document.type};base64,${buffer}`, {
                    public_id: `${cookies().get('store')?.value}/purchase/${purchase.id}`,
                })

                await e.purchase.update({
                    where: {
                        id: purchase.id,
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
        console.log(e)
        throw new Error("Kesalahan saat menambahkan data!")
    }
}