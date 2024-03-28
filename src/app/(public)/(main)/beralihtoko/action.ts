import prisma from "../../../../../prisma/database";

export const getAllStore = async () => await prisma.store.findMany({
    select: {
        id: true,
        name: true
    },
    orderBy: {
        name: 'asc'
    }
})