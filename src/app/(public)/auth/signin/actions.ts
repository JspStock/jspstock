"use server"

import { cookies } from "next/headers"
import prisma from "../../../../../prisma/database"
import bcrypt from 'bcrypt'

export const checkExistUsername = async (usernane: string) => await prisma.user.count({
    where: {
        username: {
            contains: usernane
        }
    }
})

export const validatePasswordUser = async (username: string, password: string): Promise<boolean> => {
    try {
        const data = await prisma.user.findFirst({
            where: { username },
            select: {
                password: true
            }
        })

        if (data != null) {
            return await bcrypt.compare(password, data.password)
        } else {
            return false
        }
    } catch {
        throw new Error("kesalahan pada server!")
    }
}