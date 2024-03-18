const Form = () => {
    return (
        <form className="mt-10">
            <div className="grid lg:grid-cols-2 gap-5 mt-5">
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Dari Rekening*(Wajib)</span>
                    </div>
                    <select id="countries" className="bg-gray-50 border input input-bordered w-full max-w-xs">
                        <option selected className="text-gray-200">Dari Rekening</option>
                        <option value="">Canada</option>
                        <option value="">France</option>
                    </select>
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Ke Rekening*(Wajib)</span>
                    </div>
                    <select id="countries" className="bg-gray-50 border input input-bordered w-full max-w-xs">
                        <option selected className="text-gray-200">Ke Rekening</option>
                        <option value="">Canada</option>
                        <option value="">France</option>
                    </select>
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Jumlah*(Wajib)</span>
                    </div>
                    <input type="text" placeholder="Saldo" className="input input-bordered w-full max-w-xs" />
                </label>
            </div>
            <button className="btn bg-blue-900 my-5 text-white">Simpan</button>
        </form>
    )
}
export default Form