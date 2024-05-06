import { Metadata } from "next"
import dynamic from "next/dynamic"
import { getProductCategories, getSupplier } from "./action"

const Form = dynamic(() => import("@/app/components/product/tambahproduk/form"))
const BackButton = dynamic(() => import('@/app/components/backButton'))

export const metadata: Metadata = {
    title: 'Tambah produk'
}

const TambahProduk = async () => {
    const [productCategories, supplier] = await Promise.all([
        getProductCategories(),
        getSupplier()
    ])

    return (
        <main className="bg-white p-14">
            <BackButton />

            <div className="mt-5">
                <h1 className="text-gray-900 font-semibold text-xl">Tambah Produk</h1>
                <h1 className="text-gray-400 text-sm">Label pada kotak yang ditandai dengan * adalah Wajib di input.</h1>
                <Form 
                    productCategories={productCategories}
                    supplier={supplier} />
            </div>
        </main>
    )
}
export default TambahProduk