"use server"

import { cookies } from "next/headers"
import prisma from "../../../prisma/database"
import { compareSync } from 'bcrypt'

export const validatePassword = async (value: string): Promise<boolean> => {
    const result = await prisma.permissionPassword.findFirst({
        where: {
            idStore: cookies().get('store')!.value
        },
        select: {
            password: true
        }
    })

    if(result){
        return compareSync(value, result.password)
    }else{
        return false
    }
}