import dynamic from "next/dynamic"

const TableOrder = dynamic(() => import("@/app/components/pemaketan/listpemaketan/input/tableorderpemaketan"))
const TableTotal = dynamic(() => import("@/app/components/pemaketan/listpemaketan/input/tabletotal"))
const Comboboxproduk = dynamic(() => import("@/app/components/pemaketan/listpemaketan/input/cbproduk"))
const Comboboxcostomer = dynamic(() => import("@/app/components/pemaketan/listpemaketan/input/cbcostomer"))

const Form = () => {
    return (
        <form className="mt-10">
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Costomer*(Wajib)</span>
                </div>
                <Comboboxcostomer />
            </label>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Produk*(Wajib)</span>
                </div>
                <Comboboxproduk />
            </label>
            <TableOrder />
            <div className="grid lg:grid-cols-2 gap-5 mt-5">
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Nomor Referensi</span>
                    </div>
                    <input type="text" placeholder="Nomor Referensi" className="input input-bordered w-full max-w-xs" />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Diskon</span>
                    </div>
                    <input type="text" placeholder="Diskon" className="input input-bordered w-full max-w-xs" />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Harga Pengiriman</span>
                    </div>
                    <input type="text" placeholder="Harga pengiriman" className="input input-bordered w-full max-w-xs" />
                </label>
            </div>
            <TableTotal />
            <button className="btn bg-blue-900 my-5 text-white">Simpan</button>
        </form>
    )
}
export default Form