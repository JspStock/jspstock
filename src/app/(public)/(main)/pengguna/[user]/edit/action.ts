"use server"

import { $Enums, Prisma } from "@prisma/client"
import { genSalt, hash } from 'bcrypt-ts'
import { cookies } from "next/headers"
import prisma from "../../../../../../../prisma/database"
import { revalidatePath } from "next/cache"

export const checkUsername = async (username: string) => await prisma.user.count({
    where: {
        username: username
    }
})

export const checkEmail = async (email: string) => await prisma.user.count({
    where: {
        email: email
    }
})

export const checkNoWa = async (noWa: string) => await prisma.user.count({
    where: {
        noWa: noWa
    }
})

export const getUserName = async (id: string) => await prisma.user.findUnique({
    where: {
        id: id
    },
    select: {
        name: true
    }
})

export type GetUserDataPayload = Prisma.UserGetPayload<{
    select: {
        id: true,
        name: true,
        username: true,
        email: true,
        noWa: true,
        role: true
    }
}>

export const getUserData = async(id: string) => await prisma.user.findUnique({
    where: {
        id
    },
    select: {
        id: true,
        name: true,
        username: true,
        email: true,
        noWa: true,
        role: true
    }
})

export const updateUser = async (id: string, name: string, username: string, email: string, noWa: string, role: $Enums.Role) => {
    try{
        await prisma.user.update({
            where: {
                id
            },
            data: {
                id: `USR_${Date.now()}`,
                idStore: role != $Enums.Role.OWNER ? cookies().get('store')?.value : undefined,
                username: username,
                email: email,
                noWa: noWa,
                role: role,
                name: name,
                status: $Enums.UserStatus.AKTIF
            }
        })

        revalidatePath("/", 'layout')
    }catch{
        throw new Error("Kesalahan pada server!")
    }
}