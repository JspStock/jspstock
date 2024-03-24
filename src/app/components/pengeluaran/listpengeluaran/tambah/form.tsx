import dynamic from "next/dynamic"

const Tabletambahpenjualan = dynamic(() => import("@/app/components/penjualan/tambahpenjualan/tabletambahpenjualan"))
const TableTotal = dynamic(() => import("@/app/components/penjualan/tambahpenjualan/tabletotal"))

const Form = () => {
    return (
        <form className="mt-10">
            <div className="grid lg:grid-cols-2 gap-5 mt-5">
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Kategori Pengeluaran*(Wajib)</span>
                    </div>
                    <select id="countries" className="bg-gray-50 border input input-bordered w-full max-w-xs">
                        <option selected className="text-gray-200">Kategori</option>
                        <option value="">United States</option>
                        <option value="">Canada</option>
                        <option value="">France</option>
                        <option value="">Germany</option>
                    </select>
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Jumlah Pengeluaran*(Wajib)</span>
                    </div>
                    <input type="text" placeholder="Jumlah" className="input input-bordered w-full max-w-xs" />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Rekening*(Wajib)</span>
                    </div>
                    <select id="countries" className="bg-gray-50 border input input-bordered w-full max-w-xs">
                        <option selected className="text-gray-200">Rekening</option>
                        <option value="">Hanif (12172818281728)</option>
                    </select>
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Catatan Penjualan</span>
                    </div>
                    <textarea className="textarea textarea-bordered" placeholder="Catatan"></textarea>
                </label>
            </div>
            <button className="btn bg-blue-900 my-5 text-white">Simpan</button>
        </form>
    )
}
export default Form