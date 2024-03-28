import dynamic from "next/dynamic"
import { getAllStore } from "./action"
import { cookies } from "next/headers"

const Form = dynamic(() => import("@/app/components/beralihtoko/form"))

const Beralihtoko = async () => {
    const allStore = await getAllStore()

    return (
        <>
            <main className="bg-white p-14">
                <h1 className="text-gray-900 font-semibold text-xl">Apakah Kamu ingin Beralih Toko?</h1>
                <Form 
                    data={allStore}
                    currentStore={cookies().get('store')!.value} />
            </main>
        </>
    )
}
export default Beralihtoko