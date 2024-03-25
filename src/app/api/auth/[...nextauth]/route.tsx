import NextAuth from 'next-auth'
import CredentialProviders from 'next-auth/providers/credentials'

export const authOptions = NextAuth({
    providers: [
        CredentialProviders({
            name: 'credentials',
            credentials: {},
            authorize(credentials, req) {
                const { username, password } = credentials as {
                    username: string,
                    password: string
                }

                if(username != 'eugene' && password != 'eugene702'){
                    throw new Error('Invalid credentials')
                }

                return {
                    id: '1',
                    name: username,
                    email: username
                }
            },
        })
    ],

    pages: {
        signIn: '/auth/signin'
    }
})

export { authOptions as GET, authOptions as POST }