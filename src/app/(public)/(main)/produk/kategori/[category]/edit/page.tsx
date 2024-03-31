import { Metadata } from "next"
import dynamic from "next/dynamic"
import { getData, getNameCategory, getProductCategories } from "./action"
import { redirect } from "next/navigation"

const BackButton = dynamic(() => import('@/app/components/backButton'))
const Form = dynamic(() => import("@/app/components/product/kategori/[category]/edit/form"))

export const generateMetadata = async ({ params }: { params: { category: string } }): Promise<Metadata> => {
    const name = await getNameCategory(params.category)

    return {
        title: `Edit kategori ${name ? name.name : ''}`
    }
}

const TambahKategori = async ({ params }: { params: { category: string } }) => {
    const data = await getData(params.category)
    data == null ? redirect('/produk/kategori') : null
    const productCategories = await getProductCategories(params.category)

    return (
        <main className="bg-white p-14">
            <BackButton />

            <div className="mt-5">
                <h1 className="text-gray-900 font-semibold text-xl">Ubah Kategori</h1>
                <h1 className="text-gray-400 text-sm">Label pada kotak yang ditandai dengan * adalah Wajib di input.</h1>
                <Form parentCategory={productCategories} data={data!} />
            </div>
        </main>
    )
}
export default TambahKategori