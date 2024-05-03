import { Metadata } from "next"
import dynamic from "next/dynamic"

const BackButton = dynamic(() => import('@/app/components/backButton'))
const Form = dynamic(() => import("@/app/components/pengeluaran/kategori/tambah/form"))

export const metadata: Metadata = {
    title: "Tambah kategori pengeluaran"
}

const Tambah = () => {
    return (
        <main className="bg-white p-14 max-md:p-5">
            <BackButton />

            <div className="mt-5">
                <h1 className="text-gray-900 font-semibold text-xl">Tambah Kategori Penjualan</h1>
                <h1 className="text-gray-400 text-sm">Label pada kotak yang ditandai dengan * adalah Wajib di input.</h1>
                <Form />
            </div>
        </main>
    )
}
export default Tambah