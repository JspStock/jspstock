"use server"

import { Prisma } from "@prisma/client"
import prisma from "../../../../../../prisma/database"
import { cookies } from "next/headers"
import { SearchParams } from "./page"
import { extension } from "prisma-paginate"
import { gte, lte } from "@/utils/utils"

export type GetSavingAccountsPayLoad = Prisma.SavingAccountsGetPayload<{
    select: {
        id: true,
        name: true
    }
}>
export const getSavingAccounts = async () => await prisma.savingAccounts.findMany({
    where: {
        idStore: cookies().get('store')?.value
    },
    select: {
        id: true,
        name: true
    }
})

export type GetMutationPayload = Prisma.TransactionRecordsGetPayload<{}>
export const getMutation = async (searchParams: SearchParams) => {
    return await prisma.transactionRecords.findMany({
        where: {
            idStore: cookies().get('store')?.value,
            idSavingAccount: searchParams.account,
            createdAt: {
                lte: lte(searchParams),
                gte: gte(searchParams)
            }
        },
        include: {
            savingAccounts: {
                select: {
                    startingBalance: true
                }
            }
        }
    })
}