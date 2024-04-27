import { $Enums, PrismaClient } from '@prisma/client'
import { genSaltSync, hashSync } from 'bcrypt'
const prisma = new PrismaClient()

const main = async () => {
    try{
        await prisma.$transaction(async e => {
            const saltPassword = genSaltSync(5)
            const hashedPassword = hashSync("defaults", saltPassword)
            
            const { id } = await e.store.create({
                data: {
                   id: `STR_${Date.now()}`,
                   name: 'Default',
                   email: 'default@gmail.com',
                   noWa: '-',
                   address: '',
                },
                select: {
                    id: true
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

           await e.permissionPassword.create({
                data: {
                    idStore: id,
                    password: hashSync("default", saltPassword)
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