

const Form = () => {
    return (
        <form className="mt-10">
            <div className="grid lg:grid-cols-2 gap-5 mt-5">
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Costomer*(Wajib)</span>
                    </div>
                    <select id="countries" className="bg-gray-50 border input input-bordered w-full max-w-xs">
                        <option selected className="text-gray-200">Pilih Costomer</option>
                        <option value="">United States</option>
                        <option value="">Canada</option>
                        <option value="">France</option>
                        <option value="">Germany</option>
                    </select>
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Toko*(Wajib)</span>
                    </div>
                    <select id="countries" className="bg-gray-50 border input input-bordered w-full max-w-xs">
                        <option selected className="text-gray-200">Pilih Toko</option>
                        <option value="">United States</option>
                        <option value="">Canada</option>
                        <option value="">France</option>
                        <option value="">Germany</option>
                    </select>
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Pilih Produk*(Wajib)</span>
                    </div>
                    <input type="text" placeholder="Pilih Produk dan Select" className="input input-bordered w-full max-w-xs" />
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