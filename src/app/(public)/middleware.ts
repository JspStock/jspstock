import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
    function middleware(request: Request){
        const requestHeaders = new Headers(request.headers)
        requestHeaders.set('x-url', request.url)

        if(request.url != `${process.env.BASE_URL}/manifest.json}`){
            return NextResponse.next({
                request: {
                    headers: requestHeaders
                }
            })
        }
    },
    {
    pages: {
        signIn: "/auth/signin",
        signOut: "/auth/signout"
    },
})