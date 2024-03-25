"use client"

import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import React, { ReactNode } from 'react'
import NextTopLoader from "nextjs-toploader"

const Provider = ({
    children,
    session
}: {
    children: ReactNode,
    session: Session
}) => {
    return <SessionProvider session={session}>
        <NextTopLoader color="#1e3a8a" />
        {children}
    </SessionProvider>
}

export default Provider