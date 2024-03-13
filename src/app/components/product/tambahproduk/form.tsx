const Form = () => {
    return (
        <form className="mt-10">
            <h1 className="py-2">Foto Produk*</h1>
            <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
            <div className="grid lg:grid-cols-2 gap-5 mt-5">
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Nama Produk*(Wajib)</span>
                    </div>
                    <input type="text" placeholder="Nama Produk" className="input input-bordered w-full max-w-xs" />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Kode Produk*(Wajib)</span>
                    </div>
                    <input type="text" placeholder="Kode Produk" className="input input-bordered w-full max-w-xs" />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Kategori Produk*(Wajib)</span>
                    </div>
                    <select id="countries" className="bg-gray-50 border input input-bordered w-full max-w-xs">
                        <option selected className="text-gray-200">Kategori Produk</option>
                        <option value="">United States</option>
                        <option value="">Canada</option>
                        <option value="">France</option>
                        <option value="">Germany</option>
                    </select>
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Quantity Produk*(Wajib)</span>
                    </div>
                    <input type="text" placeholder="Quantity" className="input input-bordered w-full max-w-xs" />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Harga*(Wajib)</span>
                    </div>
                    <input type="text" placeholder="Harga" className="input input-bordered w-full max-w-xs" />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Biaya*(Wajib)</span>
                    </div>
                    <input type="text" placeholder="Biaya" className="input input-bordered w-full max-w-xs" />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Nilai Pasti (Harga/Biaya)*(Wajib)</span>
                    </div>
                    <input type="text" placeholder="Nilai Pasti" className="input input-bordered w-full max-w-xs" />
                </label>
            </div>
            <button className="btn bg-blue-900 my-5 text-white">Simpan</button>
        </form>
    )
}
export default Form