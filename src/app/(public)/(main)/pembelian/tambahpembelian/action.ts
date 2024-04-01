import { cookies } from "next/headers";
import prisma from "../../../../../../prisma/database";

export const getProductData = async () => await prisma.product.findMany({
    where: {
        idStore: cookies().get('store')?.value
    },
    select: {
        id: true,
        name: true,
        qty: true,
        price: true
    }
})

export const getSupplierData = async () => await prisma.supplier.findMany({
    where: {
        idStore: cookies().get('store')?.value,
    },
    select: {
        id: true,
        name: true
    }
})