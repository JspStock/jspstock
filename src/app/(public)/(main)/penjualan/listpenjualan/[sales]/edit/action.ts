"use server"

import { cookies } from "next/headers"
import { $Enums } from "@prisma/client"
import Cloudinary from "@/utils/cloudinary"
import { revalidatePath } from "next/cache"
import prisma from "../../../../../../../../prisma/database"
import { FormWithoutDocument } from "@/app/components/penjualan/listpenjualan/[sales]/edit/form"

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

export const getData = async (id: string) => await prisma.sales.findUnique({
    where: {
        idStore: cookies().get('store')?.value,
        id: id
    },
    select: {
        id: true,
        saleOrder: {
            select: {
                id: true,
                product: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                qty: true,
            }
        },
        documentPath: true,
        idCustomerUser: true,
        saleStatus: true,
        purchaseStatus: true,
        discount: true,
        shippingCost: true,
        saleNotes: true,
        staffNotes: true,
        idSavingAccount: true
    }
})


export const updateData = async (id: string, form: FormWithoutDocument, file: string | null) => {
    try{
        await prisma.$transaction(async e => {
            const updateResult = await e.sales.update({
                where: {
                    id: id,
                    idStore: cookies().get('store')?.value
                },
                data: {
                    id: `SLS_${form.ref}`,
                    idCustomerUser: form.customer ? form.customer.id : undefined,
                    saleStatus: form.saleStatus as keyof typeof $Enums.SaleStatus,
                    purchaseStatus: form.salePurchaseStatus as keyof typeof $Enums.SalePurchaseStatus,
                    discount: form.discount ? parseInt(form.discount) : undefined,
                    shippingCost: form.shippingCost ? parseInt(form.shippingCost) : undefined,
                    staffNotes: form.staffNotes ?? undefined,
                    saleNotes: form.saleNotes ?? undefined,
                },
                select: {
                    id: true,
                    saleOrder: {
                        select: {
                            id: true,
                            qty: true,
                        }
                    }
                }
            })

            await e.sales.update({
                where: {
                    idStore: cookies().get('store')?.value,
                    id: updateResult.id
                },
                data: {
                    saleOrder: {
                        deleteMany: {},
                        createMany: {
                            data: form.order.map(e => ({
                                idStore: cookies().get('store')!.value,
                                idProduct: e.id,
                                qty: parseInt(e.qty),
                            }))
                        }
                    }
                }
            })

            if(file){
                await Cloudinary.uploader.upload(file)
            }
        })

        revalidatePath('/', 'layout')
    }catch{
        throw new Error("Terjadi kesalahan saat memperbarui data!")
    }
}