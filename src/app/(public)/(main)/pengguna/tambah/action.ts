"use server"

import { $Enums } from "@prisma/client"
import { genSalt, hash } from 'bcrypt-ts'
import { cookies } from "next/headers"
import prisma from "../../../../../../prisma/database"

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

export const createUser = async (name: string, username: string, email: string, password: string, noWa: string, role: $Enums.Role) => {
    try{
        const saltPassword = await genSalt(5)
        const hashPassword = await hash(password, saltPassword)

        await prisma.user.create({
            data: {
                id: `USR_${Date.now()}`,
                idStore: role != $Enums.Role.OWNER ? cookies().get('store')?.value : undefined,
                username: username,
                email: email,
                password: hashPassword,
                noWa: noWa,
                role: role,
                name: name,
                status: $Enums.UserStatus.AKTIF
            }
        })
    }catch{
        throw new Error("Kesalahan pada server!")
    }
}