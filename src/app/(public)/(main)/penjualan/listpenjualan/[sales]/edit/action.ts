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
        qty: true,
        price: true
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
        staffNotes: true
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

            for(let i of form.orderDeleted){
                const getItemOld = updateResult.saleOrder.find(e => e.id == i.idOrder)?.qty
                const getQtyProduct = await e.product.findUnique({
                    where: {
                        idStore: cookies().get('store')?.value,
                        id: i.id
                    },
                    select: {
                        qty: true
                    }
                })

                await e.product.update({
                    where: {
                        idStore: cookies().get('store')?.value,
                        id: i.id
                    },
                    data: {
                        qty: getQtyProduct!.qty + getItemOld!
                    }
                })
            }

            for(let i of form.order){
                const getQtyProduct = await e.product.findUnique({
                    where: {
                        idStore: cookies().get('store')?.value,
                        id: i.id
                    },
                    select: {
                        qty: true
                    }
                })

                const detemineNegativeOrPositiveQty = () => {
                    let result: number = getQtyProduct!.qty
                    let qtyOld: number | undefined = updateResult.saleOrder.find(e => e.id == i.idOrder)?.qty

                    if(qtyOld != undefined){
                        if(parseInt(i.qty) > qtyOld){
                            result -= (parseInt(i.qty) - qtyOld)
                        }else if(parseInt(i.qty) < qtyOld){
                            result += (qtyOld - parseInt(i.qty))
                        }
                    }else{
                        result -= parseInt(i.qty)
                    } 

                    return result
                }

                await e.product.update({
                    where: {
                        idStore: cookies().get('store')?.value,
                        id: i.id
                    },
                    data: {
                        qty: detemineNegativeOrPositiveQty()
                    }
                })
            }

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