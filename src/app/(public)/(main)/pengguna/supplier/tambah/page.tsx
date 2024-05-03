import { Metadata } from "next"
import dynamic from "next/dynamic"

const Form = dynamic(() => import("@/app/components/pengguna/supplier/tambah/form"))
const BackButton = dynamic(() => import('@/app/components/backButton'))

export const metadata: Metadata = {
    title: 'Tambah Supplier'
}

const TambahSupplier = () => {
    return (
        <main className="bg-white p-14 max-md:p-5">
            <BackButton />

            <div className="mt-5">
                <h1 className="text-gray-900 font-semibold text-xl">Tambah Supplier</h1>
                <h1 className="text-gray-400 text-sm">Label pada kotak yang ditandai dengan * adalah Wajib di input.</h1>
                <Form />
            </div>
        </main>
    )
}
export default TambahSupplier