import dynamic from "next/dynamic"

const Comboboxproduk = dynamic (()=> import("@/app/components/pengembalian/penjualan/tambah/cbproduk"))
const Comboboxcostomer = dynamic (()=> import("@/app/components/pengembalian/penjualan/tambah/cbcostomer"))

const Form = () => {
    return (
        <form className="mt-10">
            <div className="grid lg:grid-cols-2 gap-5 mt-5">
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Costomer*(Wajib)</span>
                    </div>
                    <Comboboxcostomer />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Pilih Produk*(Wajib)</span>
                    </div>
                    <Comboboxproduk />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Catatan</span>
                    </div>
                    <textarea className="textarea textarea-bordered" placeholder="Catatan"></textarea>
                </label>
            </div>
            <button className="btn bg-blue-900 my-5 text-white">Simpan</button>
        </form>
    )
}
export default Form