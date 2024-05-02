"use server"

import { cookies } from "next/headers"
import prisma from "../../../../../../../prisma/database"

const today = new Date()
export const getPurchase = async ({ year }: { year?: number }) => {
    return await prisma.purchase.findMany({
        where: {
            idStore: cookies().get('store')?.value,
            createdAt: {
                gte: year != undefined ? new Date(year, 1, 0) : new Date(today.getFullYear(), 1, 0),
                lte: year != undefined ? new Date(year, 12, 0) : new Date(today.getFullYear(), 12, 0)
            }
        },
        select: {
            id: true,
            total: true,
            createdAt: true
        }
    })
}