const Form = () => {
    return <form className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="form-control">
            <label htmlFor="totalPayment" className="label">
                <span className="label-text">Jumlah Pembayaran</span>
            </label>

            <input type="number" id="totalPayment" className="input input-bordered" />
        </div>

        <div className="form-control">
            <label htmlFor="paymentMethod" className="label">
                <span className="label-text">Metode Pembayaran</span>
            </label>

            <select id="paymentMethod" className="select select-bordered">
                <option value="TUNAI">Tunai</option>
                <option value="TANSFER">Transfer</option>
                <option value="LAINNYA">Lainnya</option>
            </select>

        </div>

        <div className="form-control col-span-2">
            <label htmlFor="saveAccount" className="label">
                <span className="label-text">Rekening</span>
            </label>

            <select id="saveAccount" className="select select-bordered">
                <option value="41232">Hanif Kurniawan(23874324)</option>
            </select>
        </div>

        <div className="form-control col-span-2">
            <label htmlFor="notes" className="label">
                <span className="label-text">Catatan</span>
            </label>

            <textarea rows={10} id="notes" className="textarea textarea-bordered"></textarea>
        </div>

        <div className="flex justify-end col-span-2">
            <button type="submit" className="btn bg-blue-950 text-white rounded-box max-w-fit">Tambahkan Pembayaran</button>
        </div>
    </form>
}

export default Form