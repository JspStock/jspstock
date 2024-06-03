import NextAuth from 'next-auth'
import CredentialProviders from 'next-auth/providers/credentials'
import prisma from '../../../../../prisma/database'
import bcrypt from 'bcrypt'
import { cookies } from 'next/headers'
import { $Enums } from '@prisma/client'

export const maxDuration = 60;
const authOptions = NextAuth({
    providers: [
        CredentialProviders({
            name: 'credentials',
            credentials: {},
            async authorize(credentials, _) {
                try {
                    const { username, password } = credentials as {
                        username: string,
                        password: string
                    }

                    const getUser = await prisma.user.findFirst({
                        where: { username },
                        select: {
                            id: true,
                            email: true,
                            name: true,
                            password: true,
                            idStore: true,
                            role: true
                        }
                    })

                    if (getUser) {
                        const validatePassword = await bcrypt.compare(password, getUser.password)

                        if (validatePassword) {
                            if (getUser.idStore) {
                                cookies().set("store", getUser.idStore, { secure: true })
                                cookies().set('role', getUser.role, { secure: true })
                                cookies().set('userId', getUser.id, { secure: true })

                                return {
                                    id: getUser.id,
                                    name: getUser.name,
                                    email: getUser.email,
                                }
                            } else if (getUser.role == $Enums.Role.OWNER) {
                                const getStore = await prisma.store.findFirst({
                                    select: {
                                        id: true
                                    }
                                })

                                if (getStore != null) {
                                    cookies().set("store", getStore.id, { secure: true })
                                    cookies().set('role', getUser.role, { secure: true })
                                    cookies().set('userId', getUser.id, { secure: true })

                                    return {
                                        id: getUser.id,
                                        name: getUser.name,
                                        email: getUser.email,
                                    }
                                }
                            }

                            throw new Error("Tidak ada toko!")
                        } else {
                            throw new Error("Kata sandi pengguna salah!")
                        }
                    } else {
                        throw new Error("Pengguna tidak ditemukan!")
                    }
                } catch (e) {
                    throw new Error("Kesalahan pada server!")
                }
            },
        })
    ],

    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout'
    },
})

export { authOptions as GET, authOptions as POST }