import { Metadata } from "next"
import dynamic from "next/dynamic"
import { getProductCategories, getProductData, getProductName } from "./action"
import { redirect } from "next/navigation"

const Form = dynamic(() => import("@/app/components/product/[product]/edit/form"))
const BackButton = dynamic(() => import('@/app/components/backButton'))

interface Params{
    product: string
}

export interface ProductData{
    id: string;
    idProductCategories: string | null;
    imagePath: string;
    name: string;
    price: number;
    cost: number;
}

export const generateMetadata = async ({ params }: { params: Params }): Promise<Metadata> => {
    const productName = await getProductName(params.product)
    return {
        title: `Edit produk ${ productName ? productName.name : '' }` 
    }
}

const TambahProduk = async ({ params }: { params: Params }) => {
    const productCategories = await getProductCategories()
    const productData: ProductData | null = await getProductData(params.product)

    productData == null ? redirect("/produk/listproduk") : null

    return (
        <main className="bg-white p-14">
            <BackButton />

            <div className="mt-5">
                <h1 className="text-gray-900 font-semibold text-xl">Ubah Produk</h1>
                <h1 className="text-gray-400 text-sm">Label pada kotak yang ditandai dengan * adalah Wajib di input.</h1>
                <Form productCategories={productCategories} productData={productData!} />
            </div>
        </main>
    )
}
export default TambahProduk