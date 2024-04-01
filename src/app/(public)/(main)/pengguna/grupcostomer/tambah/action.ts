import { Form } from "@/app/components/pengguna/grupcostomer/form";
import prisma from "../../../../../../../prisma/database";

export const createCustomerGroup = async (form: Form) => {
    try{
        // await prisma.customerGroup.create({

        // })
    }catch{
        throw new Error("Kesalahan saat menambahkan data!")
    }
}