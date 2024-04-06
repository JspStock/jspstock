"use server"

import { cookies } from "next/headers"
import prisma from "../../../../../../prisma/database"

export const getProduct = async () => await prisma.product.findMany({
    where: {
        idStore: cookies().get('store')?.value,
        deletedAt: null
    },
    select: {
        id: true,
        name: true,
    }
})

export const getSupplier = async () => await prisma.supplier.findMany({
    where: {
        idStore: cookies().get('store')?.value,
    },
    select: {
        id: true,
        name: true,
    }
})