import { Metadata } from "next"
import dynamic from "next/dynamic"
import { getProductCategories, getProductData, getProductName } from "./action"
import { redirect } from "next/navigation"

const Form = dynamic(() => import("@/app/components/product/[product]/edit/form"))
const BackButton = dynamic(() => import('@/app/components/backButton'))

interface Params{
    product: string
}

export const generateMetadata = async ({ params }: { params: Params }): Promise<Metadata> => {
    const result = await getProductName(params.product)
    return {
        title: `Edit produk ${result?.name}`
    }
}

const TambahProduk = async ({ params }: { params: Params }) => {
    const productCategories = await getProductCategories()
    const productData = await getProductData(params.product)

    if(productData){
        return (
            <main className="bg-white p-14">
                <BackButton />
    
                <div className="mt-5">
                    <h1 className="text-gray-900 font-semibold text-xl">Edit Produk</h1>
                    <h1 className="text-gray-400 text-sm">Label pada kotak yang ditandai dengan * adalah Wajib di input.</h1>
                    <Form 
                        productCategories={productCategories}
                        productData={productData} />
                </div>
            </main>
        )
    }else{
        return redirect('/produk/listproduk')
    }
}
export default TambahProduk