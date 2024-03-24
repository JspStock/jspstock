"use client"

import { useRouter } from "next/navigation"

const BackButton = () => {
    const router = useRouter()

    return <button className="btn btn-ghost" onClick={() => router.back()}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
        <span>Kembali</span>
    </button>
}

export default BackButton