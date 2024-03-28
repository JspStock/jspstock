import { $Enums, PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
const prisma = new PrismaClient()

const main = async () => {
    try{
        const saltPassword = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash("defaults", saltPassword)
        await prisma.$transaction(async e => {
            await e.store.create({
                data: {
                   id: `STR_${Date.now()}`,
                   name: 'Default',
                   email: 'default@gmail.com',
                   noWa: '-',
                   address: '',
                }
           })

           await e.user.create({
                data: {
                    id: `USR_${Date.now()}`,
                    username: 'default',
                    name: 'Default',
                    password: hashedPassword,
                    email: '',
                    noWa: '',
                    role: $Enums.Role.OWNER,
                    status: $Enums.UserStatus.AKTIF,
                }
           })
        })
    }catch(e){
        await prisma.$disconnect()
        throw new Error("Mistakes when adding Owner and Store for the first time!")
    }
}

main()
    .then(async () => await prisma.$disconnect())
    .catch(async () => await prisma.$disconnect())