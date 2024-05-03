"use server"

import { cookies } from "next/headers"
import prisma from "../../../../../../prisma/database"
import { SearchParams } from "./page"
import extensions from 'prisma-paginate'
import { revalidatePath } from "next/cache"
import Cloudinary from "@/utils/cloudinary"
import { gte, lte } from "@/utils/utils"

export const deleteData = async ({ data }: { data: Array<string> }) => {
    try{
        await prisma.$transaction(async e => {
            const storeId = cookies().get('store')!.value

            for(let i of data){
                await e.transactionRecords.deleteMany({
                    where: {
                        idStore: storeId,
                        reference: i
                    }
                })

                await e.purchase.delete({
                    where: {
                        id: i,
                        idStore: storeId
                    }
                })

                await Cloudinary.uploader.destroy(`${storeId}/purchase/${i}`)
            }
        })

        revalidatePath('/', 'layout')
    }catch{
        throw new Error("Kesalahan saat menghapus data!")
    }
}

export const getData = async ({ searchParams }: { searchParams: SearchParams }) => {
    const installExt = prisma.$extends(extensions)
    const getCount = await prisma.purchase.count()

    return await installExt.purchase.paginate({
        select: {
            id: true,
            documentPath: true,
            supplier: {
                select: {
                    name: true,
                }
            },
            purchaseStatus: true,
            total: true,
            createdAt: true
        },
        where: {
            idStore: cookies().get('store')?.value,
            OR: [
                {
                    id: {
                        contains: searchParams.search ?? '',
                        mode: 'insensitive'
                    }
                },
                {
                    supplier: {
                        name: {
                            contains: searchParams.search ?? '',
                            mode: 'insensitive'
                        }
                    }
                },
                {
                    total: searchParams.search ? !Number.isNaN(parseInt(searchParams.search)) ? {
                        lte: parseInt(searchParams.search)
                    } : undefined : undefined
                }
            ],
            createdAt: {
                gte: gte(searchParams),
                lte: lte(searchParams),
            },
        },
        orderBy: {
            createdAt: 'desc'
        }
    }, {
        limit: searchParams.show ? searchParams.show == 'all' ? getCount : parseInt(searchParams.show) : 10,
        page: parseInt(searchParams.page ?? '1')
    })
}