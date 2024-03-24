const Form = () => {
    return (
        <form className="mt-10">
            <div className="grid lg:grid-cols-2 gap-5 mt-5">
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Grup Costomer*(Wajib)</span>
                    </div>
                    <select id="countries" className="bg-gray-50 border input input-bordered w-full max-w-xs">
                        <option selected className="text-gray-200">Pilih Grup CS</option>
                        <option value="">United States</option>
                        <option value="">Canada</option>
                        <option value="">France</option>
                        <option value="">Germany</option>
                    </select>
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Nama*(Wajib)</span>
                    </div>
                    <input type="text" placeholder="Masukkan Nomor Referensi" className="input input-bordered w-full max-w-xs" />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Email*(Wajib)</span>
                    </div>
                    <input type="text" placeholder="Masukkan Email" className="input input-bordered w-full max-w-xs" />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">No WhatsApp*(Wajib)</span>
                    </div>
                    <input type="text" placeholder="Masukkan Nomor Referensi" className="input input-bordered w-full max-w-xs" />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Alamat*(Wajib)</span>
                    </div>
                    <textarea className="textarea textarea-bordered" placeholder="Alamat"></textarea>
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Kota*(Wajib)</span>
                    </div>
                    <input type="text" placeholder="Masukkan Kota" className="input input-bordered w-full max-w-xs" />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Kode Pos*(Wajib)</span>
                    </div>
                    <input type="text" placeholder="Masukkan Kode Pos" className="input input-bordered w-full max-w-xs" />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Wilayah*(Wajib)</span>
                    </div>
                    <input type="text" placeholder="Masukkan Wilayah" className="input input-bordered w-full max-w-xs" />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Kawasan*(Wajib)</span>
                    </div>
                    <input type="text" placeholder="Masukkan Wilayah" className="input input-bordered w-full max-w-xs" />
                </label>
            </div>
            <button className="btn bg-blue-900 my-5 text-white">Simpan</button>
        </form>
    )
}
export default Form