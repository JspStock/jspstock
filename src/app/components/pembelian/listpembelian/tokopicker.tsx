const Tokopicker = () => {
    return (
        <label className="form-control flex w-full max-w-xs">
            <div className="label">
                <span className="label-text">Pilih Toko</span>
            </div>
            <select id="countries" className="bg-gray-50 border input input-bordered w-full max-w-xs">
                <option selected className="text-gray-200">Pilih Toko</option>
                <option value="">United States</option>
                <option value="">Canada</option>
                <option value="">France</option>
                <option value="">Germany</option>
            </select>
        </label>
    )
}
export default Tokopicker