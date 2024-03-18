import dynamic from "next/dynamic"

const Form = dynamic(()=> import("@/app/components/product/kategori/form"))

const TambahKategori = () => {
    return (
        <main className="bg-white p-14">
            <h1 className="text-gray-900 font-semibold text-xl">Tambah Produk</h1>
            <h1 className="text-gray-400 text-sm">Label pada kotak yang ditandai dengan * adalah Wajib di input.</h1>
            <Form />
        </main>
    )
}
export default TambahKategori