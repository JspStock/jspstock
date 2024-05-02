"use server"

import { cookies } from "next/headers"
import prisma from "../../../../../../../prisma/database"

const today = new Date()
export const getPurchase = async ({ year, month }: { year?: number, month?: number }) => {
    return await prisma.purchase.findMany({
        where: {
            idStore: cookies().get('store')?.value,
            createdAt: {
                gte: year != undefined && month != undefined ? new Date(year, month - 1, 1) : new Date(today.getFullYear(), today.getMonth(), 1),
                lte: year != undefined && month != undefined ? new Date(year, month, 0) : new Date(today.getFullYear(), today.getMonth() + 1, 0)
            }
        },
        select: {
            id: true,
            total: true,
            createdAt: true
        }
    })
}