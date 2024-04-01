import { cookies } from "next/headers";
import prisma from "../../../../../../prisma/database";

export const getAllSupplier = async () => await prisma.supplier.findMany({
    where: {
        idStore: cookies().get('store')?.value
    },
    select: {
        id: true,
        name: true,
        email: true,
        noWa: true,
        address: true
    }
})