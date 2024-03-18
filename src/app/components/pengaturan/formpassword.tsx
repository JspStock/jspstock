const Form = () => {
    return (
        <form className="mt-10">
            <div className="grid lg:grid-cols-2 gap-5 mt-5">
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Kata Sandi Saat ini*(Wajib)</span>
                    </div>
                    <input type="text" placeholder="Masukkan Kata sandi saat ini" className="input input-bordered w-full max-w-xs" />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Kata Sandi Baru*(Wajib)</span>
                    </div>
                    <input type="text" placeholder="Masukkan Kata sandi baru" className="input input-bordered w-full max-w-xs" />
                </label>
            </div>
            <button className="btn bg-blue-900 my-5 text-white">Simpan</button>
        </form>
    )
}
export default Form