"use server"

import { extension } from "prisma-paginate"
import prisma from "../../../../../../prisma/database"
import { cookies } from "next/headers"
import { SearchParams } from "./page"
import { Prisma } from "@prisma/client"

export type GetTransactionRecordPayload = Prisma.SavingAccountsGetPayload<{
    select: {
        name: true,
        id: true,
        startingBalance: true,
        transactionRecords: {
            select: {
                credit: true,
                debit: true,
            }
        }
    }
}>
export const getTransactionRecord = async (searchParams: SearchParams) => {
    const storeId = cookies().get('store')?.value
    const extend = prisma.$extends(extension)
    const getCountData = await extend.savingAccounts.count({
        where: {
            idStore: storeId
        },
    })

    return await extend.savingAccounts.paginate({
        where: {
            idStore: storeId,
            OR: [
                {
                    name: {
                        contains: searchParams.search ?? '',
                        mode: 'insensitive'
                    }
                },
                {
                    id: {
                        contains: searchParams.search ?? '',
                        mode: 'insensitive'
                    }
                },
                {
                    transactionRecords: {
                        some: {
                            OR: [
                                {
                                    credit: searchParams.search ? !Number.isNaN(parseInt(searchParams.search)) ? parseInt(searchParams.search) : undefined : undefined,
                                },
                                {
                                    debit: searchParams.search ? !Number.isNaN(parseInt(searchParams.search)) ? parseInt(searchParams.search) : undefined : undefined,
                                },
                            ]
                        }
                    }
                }
            ]
        },
        select: {
            name: true,
            id: true,
            startingBalance: true,
            transactionRecords: {
                select: {
                    credit: true,
                    debit: true,
                }
            }
        }
    }, {
        limit: searchParams.show ? searchParams.show == 'all' ? getCountData : parseInt(searchParams.show) : 10,
        page: parseInt(searchParams.page ?? '1')
    })
}