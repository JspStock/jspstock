"use server"

import { cookies } from "next/headers"
import prisma from "../../../../../../../prisma/database"
import { $Enums } from "@prisma/client"
import { Order } from "@/app/components/pembelian/[purchase]/edit/tabletambahpembelian"
import Cloudinary from "@/utils/cloudinary"
import { revalidatePath } from "next/cache"
import { FormWithoutFile } from "@/app/components/pembelian/[purchase]/edit/form"

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

export const updatePurchase = async (id: string, form: FormWithoutFile, file: string | null) => {
    try {
        await prisma.$transaction(async e => {
            const purchase = await e.purchase.update({
                where: {
                    idStore: cookies().get('store')?.value,
                    id: id
                },
                data: {
                    idSupplier: form.supplier ? form.supplier.id : undefined,
                    discount: form.discount,
                    shippingCost: form.shippingCost,
                    notes: form.note,
                    purchaseStatus: form.purchaseStatus as $Enums.PurchaseStatus,
                    purchaseOrder: {
                        deleteMany: {},
                        createMany: {
                            data: form.order.map(e => ({
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

            if (file != null) {
                const resultUpload = await Cloudinary.uploader.upload(file, {
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
    } catch {
        throw new Error("Kesalahan saat menambahkan data!")
    }
}