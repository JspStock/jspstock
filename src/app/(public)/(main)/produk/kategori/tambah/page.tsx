import { Metadata } from "next"
import dynamic from "next/dynamic"
import { cookies } from "next/headers"
import { getProductCategories } from "./action"

const BackButton = dynamic(() => import('@/app/components/backButton'))
const Form = dynamic(() => import("@/app/components/product/kategori/form"))

export const metadata: Metadata = {
    title: 'Tambah kategori produk'
}

const TambahKategori = async () => {
    const productCategories = await getProductCategories()

    return (
        <main className="bg-white p-14">
            <BackButton />

            <div className="mt-5">
                <h1 className="text-gray-900 font-semibold text-xl">Tambah Kategori</h1>
                <h1 className="text-gray-400 text-sm">Label pada kotak yang ditandai dengan * adalah Wajib di input.</h1>
                <Form data={productCategories} />
            </div>
        </main>
    )
}
export default TambahKategori