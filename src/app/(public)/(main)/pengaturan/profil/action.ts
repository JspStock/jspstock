"use server"

import { Prisma } from "@prisma/client"
import prisma from "../../../../../../prisma/database"
import { getServerSession } from "next-auth"
import { Form } from "@/app/components/pengaturan/form"
import { revalidatePath } from "next/cache"
import bcrypt, { genSalt, hash } from 'bcrypt'


export const getCountDataByUsername = async (val: string) => await prisma.user.count({
    where: {
        username: val
    }
})

export const getCountDataByEmail = async (val: string) => await prisma.user.count({
    where: {
        email: val
    }
})

export const getCountDataByNoWa = async (val: string) => await prisma.user.count({
    where: {
        noWa: val
    }
})

export type GetProfileDataPayload = Prisma.UserGetPayload<{
    select: {
        id: true,
        name: true,
        username: true,
        email: true,
        noWa: true
    }
}>

export const getProfileData = async () => {
    const session = await getServerSession()
    const userId = await prisma.user.findFirst({
        where: {
            email: session!.user!.email!
        },
        select: {
            id: true
        }
    })

    return await prisma.user.findUnique({
        where: {
            id: userId?.id
        },
        select: {
            id: true,
            name: true,
            username: true,
            email: true,
            noWa: true
        }
    })
}

export const updateData = async (id: string, form: Form) => {
    try{
        await prisma.user.update({
            where: {
                id
            },
            data: {
                name: form.name,
                email: form.email,
                username: form.username,
                noWa: String(form.noWa)
            }
        })

        revalidatePath("/", "layout")
    }catch{
        throw new Error("Kesalahan pada server!")
    }
}

export const checkPassword = async(id: string, password: string) => {
    try{
        const data = await prisma.user.findUnique({
            where: {id},
            select: {
                password: true
            }
        })

        const validatePassword = await bcrypt.compare(password, data!.password)
        return validatePassword
    }catch{
        throw new Error("Kesalahan pada server!")
    }
}

export const updatePassword = async(id: string, password: string) => {
    try{
        const salt = await genSalt(5)
        const hashed = await hash(password, salt)
        await prisma.user.update({
            where: {id},
            data: {
                password: hashed
            }
        })

        revalidatePath("/", "layout")
    }catch{
        throw new Error('Kesalahan pada server!')
    }
}