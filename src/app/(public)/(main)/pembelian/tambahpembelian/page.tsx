import { Metadata } from "next"
import dynamic from "next/dynamic"
import { getProductData, getSupplierData } from "./action"

const Form = dynamic(() => import("@/app/components/pembelian/tambahpembelian/form"))
const BackButton = dynamic(() => import('@/app/components/backButton'))

export const metadata: Metadata = {
    title: 'Tambah pemblian'
}

export interface Product{
    id: string;
    name: string;
    qty: number;
    price: number;
}

export interface Supplier{
    id: string;
    name: string;
}

const TambahPembelian = async () => {
    const productData: Array<Product> = await getProductData()
    const supplierData: Array<Supplier> = await getSupplierData()

    return (
        <main className="bg-white p-14">
            <BackButton />

            <div className="mt-5">
                <h1 className="text-gray-900 font-semibold text-xl">Tambah Pembelian</h1>
                <h1 className="text-gray-400 text-sm">Label pada kotak yang ditandai dengan * adalah Wajib di input.</h1>
                <Form 
                    product={productData}
                    supplier={supplierData} />
            </div>
        </main>
    )
}
export default TambahPembelian