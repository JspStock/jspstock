import dynamic from "next/dynamic"

const Comboboxsupplier = dynamic (()=> import("@/app/components/pengembalian/pembelian/tambah/cbsupplier"))
const Comboboxpembelian = dynamic (()=> import("@/app/components/pengembalian/pembelian/tambah/cbpembelian"))

const Form = () => {
    return (
        <form className="mt-10">
            <div className="grid lg:grid-cols-2 gap-5 mt-5">
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Supplier</span>
                    </div>
                    <Comboboxsupplier />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Pilih Pembelian*(Wajib)</span>
                    </div>
                    <Comboboxpembelian />
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