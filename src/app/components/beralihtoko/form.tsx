const Form = () => {
    return (
        <form className="mt-10">
            <div className="grid lg:grid-cols-2 gap-5 mt-5">
            <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Pilih Toko yang kamu inginkan</span>
                    </div>
                    <select id="countries" className="bg-gray-50 border input input-bordered w-full max-w-xs">
                        <option selected className="text-gray-200">Toko</option>
                        <option value="">Toko 1</option>
                        <option value="">Toko 2</option>
                    </select>
                </label>
            </div>
            <button className="btn bg-blue-900 my-5 text-white">Beralih Toko</button>
        </form>
    )
}
export default Form