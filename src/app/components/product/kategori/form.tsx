const Form = () => {
    return (
        <form className="mt-10">
            <h1 className="py-2">Foto*</h1>
            <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
            <div className="grid lg:grid-cols-2 gap-5 mt-5">
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Nama Kategori*(Wajib)</span>
                    </div>
                    <input type="text" placeholder="Nama Kategori" className="input input-bordered w-full max-w-xs" />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Parent Kategori*(Wajib)</span>
                    </div>
                    <select id="countries" className="bg-gray-50 border input input-bordered w-full max-w-xs">
                        <option selected className="text-gray-200">Pilih</option>
                        <option value="">United States</option>
                        <option value="">Canada</option>
                        <option value="">France</option>
                        <option value="">Germany</option>
                    </select>
                </label>
            </div>
            <button className="btn bg-blue-900 my-5 text-white">Simpan</button>
        </form>
    )
}
export default Form