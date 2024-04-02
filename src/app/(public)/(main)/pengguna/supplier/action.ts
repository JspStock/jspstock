"use server"

import { cookies } from "next/headers";
import prisma from "../../../../../../prisma/database";
import { SearchParams } from "./page";
import { revalidatePath } from "next/cache";

export const getCountSupplierData = async (searchParams: SearchParams) => await prisma.supplier.count({
    where: {
        idStore: cookies().get('store')?.value,
        OR: [
            {
                name: {
                    contains: searchParams.search ?? '',
                    mode: 'insensitive'
                },
            },
            {
                email: {
                    contains: searchParams.search ?? '',
                    mode: 'insensitive'
                },
            },
            {
                noWa: {
                    contains: searchParams.search ?? '',
                    mode: 'insensitive'
                },
            },
            {
                address: {
                    contains: searchParams.search ?? '',
                    mode: 'insensitive'
                }
            }
        ]
    }
})

export const getAllSupplier = async (searchParams: SearchParams) => await prisma.supplier.findMany({
    where: {
        idStore: cookies().get('store')?.value,
        OR: [
            {
                name: {
                    contains: searchParams.search ?? '',
                    mode: 'insensitive'
                },
            },
            {
                email: {
                    contains: searchParams.search ?? '',
                    mode: 'insensitive'
                },
            },
            {
                noWa: {
                    contains: searchParams.search ?? '',
                    mode: 'insensitive'
                },
            },
            {
                address: {
                    contains: searchParams.search ?? '',
                    mode: 'insensitive'
                }
            }
        ]
    },
    select: {
        id: true,
        name: true,
        email: true,
        noWa: true,
        address: true
    },
    take: searchParams.show ? searchParams.show == 'all' ? undefined : parseInt(searchParams.show) : 10,
    skip: searchParams.page ? (parseInt(searchParams.page ?? 1) - 1) * (parseInt(searchParams.show ?? '10')) : 0
})

export const deleteSupplier = async (id: Array<string>) => {
    try{
        await prisma.$transaction(async e => {
            for(let i of id){
                await e.supplier.deleteMany({
                    where: {
                        idStore: cookies().get('store')?.value,
                        id: i
                    }
                })
            }
        })

        revalidatePath('/', 'layout')
    }catch{
        throw new Error('Kesalahan saat menghapus data!')
    }
}