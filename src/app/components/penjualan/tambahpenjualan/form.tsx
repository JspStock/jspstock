import dynamic from "next/dynamic"

const Tabletambahpenjualan = dynamic(() => import("@/app/components/penjualan/tambahpenjualan/tabletambahpenjualan"))
const TableTotal = dynamic(() => import("@/app/components/penjualan/tambahpenjualan/tabletotal"))
const Comboboxcostomer = dynamic(() => import("@/app/components/penjualan/tambahpenjualan/cbcostomer"))
const Comboboxproduk = dynamic(() => import("@/app/components/penjualan/tambahpenjualan/cbproduk"))

const Form = () => {
    return (
        <form className="mt-10">
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Pilih Produk*(Wajib)</span>
                </div>
                <Comboboxproduk />
            </label>
            <Tabletambahpenjualan />
            <h1 className="py-2 text-gray-900">Dokumen*(Wajib)</h1>
            <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
            <div className="grid lg:grid-cols-2 gap-5 mt-5">
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Nomor Referensi*(Wajib)</span>
                    </div>
                    <input type="text" placeholder="Masukkan Nomor Referensi" className="input input-bordered w-full max-w-xs" />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Costomer*(Wajib)</span>
                    </div>
                    <Comboboxcostomer />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Status Penjualan*(Wajib)</span>
                    </div>
                    <select id="countries" className="bg-gray-50 border input input-bordered w-full max-w-xs">
                        <option selected className="text-gray-200">Status</option>
                        <option value="">Selesai</option>
                        <option value="">Tertunda</option>
                    </select>
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Status Pembayaran*(Wajib)</span>
                    </div>
                    <select id="countries" className="bg-gray-50 border input input-bordered w-full max-w-xs">
                        <option selected className="text-gray-200">Status</option>
                        <option value="">Jatuh Tempo</option>
                        <option value="">Dibayar</option>
                        <option value="">Sebagian</option>
                        <option value="">Tertunda</option>
                    </select>
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Diskon*(Wajib)</span>
                    </div>
                    <input type="text" placeholder="Diskon" className="input input-bordered w-full max-w-xs" />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Biaya Pengiriman*(Wajib)</span>
                    </div>
                    <input type="text" placeholder="Biaya" className="input input-bordered w-full max-w-xs" />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Catatan Penjualan</span>
                    </div>
                    <textarea className="textarea textarea-bordered" placeholder="Catatan"></textarea>
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Catatan Staff Admin</span>
                    </div>
                    <textarea className="textarea textarea-bordered" placeholder="Catatan"></textarea>
                </label>
            </div>
            <TableTotal />
            <button className="btn bg-blue-900 my-5 text-white">Simpan</button>
        </form>
    )
}
export default Form