"use server"

import { cookies } from "next/headers"
import prisma from "../../../../../../prisma/database"
import { SearchParams } from "./page"
import { gte, lte } from "@/utils/utils"

export const getPurchase = async (searcParams: SearchParams) => {
    return await prisma.purchase.findMany({
        where: {
            idStore: cookies().get('store')?.value,
            createdAt: {
                lte: lte(searcParams),
                gte: gte(searcParams)
            }
        },
        select: {
            discount: true,
            shippingCost: true,
            purchaseOrder: {
                select: {
                    qty: true,
                    product: {
                        select: {
                            price: true,
                            cost: true
                        }
                    }
                }
            }
        }
    })
}

export const getSale = async (searchParams: SearchParams) => await prisma.sales.findMany({
    where: {
        idStore: cookies().get('store')?.value,
        createdAt: {
            lte: lte(searchParams),
            gte: gte(searchParams)
        }
    },
    select: {
        discount: true,
        shippingCost: true,
        saleOrder: {
            select: {
                qty: true,
                product: {
                    select: {
                        price: true
                    }
                }
            }
        }
    }
})

export const getSaleReturn = async (searchParams: SearchParams) => await prisma.saleReturns.findMany({
    where: {
        idStore: cookies().get('store')?.value,
        createdAt: {
            lte: lte(searchParams),
            gte: gte(searchParams)
        }
    },
    select: {
        saleReturnOrders: {
            select: {
                qty: true,
                product: {
                    select: {
                        price: true
                    }
                }
            }
        }
    }
})

export const getPurchaseReturn = async (searchParams: SearchParams) => await prisma.purchaseReturns.findMany({
    where: {
        idStore: cookies().get('store')?.value,
        createdAt: {
            lte: lte(searchParams),
            gte: gte(searchParams)
        }
    },
    select: {
        purchaseReturnOrders: {
            select: {
                qty: true,
                product: {
                    select: {
                        price: true,
                    }
                }
            }
        }
    }
})

export const getExpenditures = async (searchParams: SearchParams) => await prisma.expenditures.findMany({
    where: {
        idStore: cookies().get('store')?.value,
        createdAt: {
            lte: lte(searchParams),
            gte: gte(searchParams)
        }
    },
    select: {
        total: true
    }
})