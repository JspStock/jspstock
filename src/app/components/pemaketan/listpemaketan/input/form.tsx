import dynamic from "next/dynamic"

const TableOrder =dynamic(()=> import ("@/app/components/pemaketan/listpemaketan/input/tableorderpemaketan"))
const TableTotal =dynamic(()=> import ("@/app/components/pemaketan/listpemaketan/input/tabletotal"))

const Form = () => {
    return (
        <form className="mt-10">
            <div className="grid lg:grid-cols-2 gap-5 mt-5">
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Nomor Referensi*(Wajib)</span>
                    </div>
                    <input type="text" placeholder="Nomor Referensi" className="input input-bordered w-full max-w-xs" />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Toko*(Wajib)</span>
                    </div>
                    <select id="countries" className="bg-gray-50 border input input-bordered w-full max-w-xs">
                        <option selected className="text-gray-200">Pilih Toko</option>
                        <option value="">JSP OLSHOP DEPOK</option>
                        <option value=""></option>
                    </select>
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Costomer*(Wajib)</span>
                    </div>
                    <select id="countries" className="bg-gray-50 border input input-bordered w-full max-w-xs">
                        <option selected className="text-gray-200">Pilih Costomer</option>
                        <option value="">nisa</option>
                        <option value="">nur</option>
                    </select>
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Produk*(Wajib)</span>
                    </div>
                    <input type="text" placeholder="Cari Produk nama atau kode" className="input input-bordered w-full max-w-xs" />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Diskon*(Wajib)</span>
                    </div>
                    <input type="text" placeholder="Diskon" className="input input-bordered w-full max-w-xs" />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Harga Pengiriman*(Wajib)</span>
                    </div>
                    <input type="text" placeholder="Harga pengiriman" className="input input-bordered w-full max-w-xs" />
                </label>
            </div>
            <TableOrder />
            <TableTotal />
            <button className="btn bg-blue-900 my-5 text-white">Simpan</button>
        </form>
    )
}
export default Form