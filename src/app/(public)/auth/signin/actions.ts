"use server"

import prisma from "../../../../../prisma/database"

export const getUser = async (username: string) => await prisma.user.findFirst({
    where: {
        username: {
            contains: username
        }
    },
    select: {
        username: true,
        password: true
    }
})