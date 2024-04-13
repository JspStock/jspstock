"use server"

import { cookies } from "next/headers"
import prisma from "../../../../../../prisma/database"
import { FormWithoutDocument } from "@/app/components/penjualan/tambahpenjualan/form"
import { $Enums } from "@prisma/client"
import Cloudinary from "@/utils/cloudinary"
import { revalidatePath } from "next/cache"

export const getProduct = async () => await prisma.product.findMany({
    where: {
        idStore: cookies().get('store')?.value,
        deletedAt: null
    },
    select: {
        id: true,
        name: true,
        price: true,
        saleOrder: {
            select: {
                qty: true,
                sale: {
                    select: {
                        saleReturns: {
                            select: {
                                qty: true
                            }
                        }
                    }
                }
            }
        },
        purchaseOrder: {
            select: {
                qty: true,
                purchase: {
                    select: {
                        purchaseReturns: {
                            select: {
                                qty: true
                            }
                        }
                    }
                }
            }
        }
    }
})

export const getCustomerUser = async () => await prisma.customerUser.findMany({
    where: {
        idStore: cookies().get('store')?.value,
    },
    select: {
        id: true,
        name: true,
    }
})

export const getCountDataById = async (id: string) => await prisma.sales.count({
    where: {
        id: `SLS_${id}`,
        idStore: cookies().get('store')?.value
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

export const addData = async (form: FormWithoutDocument, file: string | null) => {
    try{
        await prisma.$transaction(async e => {
            const getIdSale = await e.sales.create({
                data: {
                    id: `SLS_${form.ref ?? Date.now()}`,
                    idStore: cookies().get('store')!.value,
                    idSavingAccount: form.savingAccount,
                    idCustomerUser: form.customer ? form.customer.id : undefined,
                    saleStatus: form.saleStatus as keyof typeof $Enums.SaleStatus,
                    purchaseStatus: form.salePurchaseStatus as keyof typeof $Enums.SalePurchaseStatus,
                    discount: form.discount ? parseInt(form.discount) : undefined,
                    shippingCost: form.shippingCost ? parseInt(form.shippingCost) : undefined,
                    saleNotes: form.saleNotes,
                    staffNotes: form.staffNotes,
                    saleOrder: {
                        createMany: {
                            data: form.order.map(e => ({
                                idStore: cookies().get('store')!.value,
                                idProduct: e.id,
                                qty: parseInt(e.qty),
                            }))
                        }
                    }
                },
                select: {
                    id: true
                }
            })

            if(file){
                const uploadResult = await Cloudinary.uploader.upload(file, {
                    public_id: `${cookies().get('store')?.value}/sales/${getIdSale.id}`
                })

                await e.sales.update({
                    where: {
                        id: getIdSale.id,
                        idStore: cookies().get('store')?.value
                    },
                    data: {
                        documentPath: uploadResult.url
                    }
                })
            }
        })

        revalidatePath("/", "layout")
    }catch(e){
        throw new Error("Kesalahan saat menambahkan data!")
    }
}