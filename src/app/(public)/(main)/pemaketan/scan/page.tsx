import { Metadata } from "next"
import dynamic from "next/dynamic"

export const metadata: Metadata = {
    title: 'Scan paket'
}

const BackButton = dynamic(() => import('@/app/components/backButton'))
const Scanner = dynamic(() => import('@/app/components/pemaketan/scan/scanner'))

const page = () => {
    return <div className="w-full flex justify-center">
        <div className="bg-white p-6 rounded-box max-w-sm w-full">
            <BackButton />
            <div className="mt-5">
                <Scanner />
            </div>
        </div>
    </div>
}

export default page