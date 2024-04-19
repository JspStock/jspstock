import dynamic from "next/dynamic"
import { getAllStore } from "./action"
import { cookies } from "next/headers"
import { Metadata } from "next"

const AllowedRoleWrapper = dynamic(() => import('@/app/components/allowedRoleWrapper'))
const BackButton = dynamic(() => import('@/app/components/backButton'))
const Form = dynamic(() => import("@/app/components/beralihtoko/form"))

export const metadata: Metadata = {
    title: 'Beralih toko'
}

const Beralihtoko = async () => {
    return <AllowedRoleWrapper allowed={['owner']}>
        <div className="bg-white p-14">
            <BackButton />

            <div className="mt-5">
                <h1 className="text-gray-900 font-semibold text-xl">Apakah Kamu ingin Beralih Toko?</h1>
                <Form
                    data={await getAllStore()}
                    currentStore={cookies().get('store')!.value} />
            </div>
        </div>
    </AllowedRoleWrapper>
}
export default Beralihtoko