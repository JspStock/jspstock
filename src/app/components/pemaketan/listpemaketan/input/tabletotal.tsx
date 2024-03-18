const TableTotal =()=>{
    return(
        <div className="lg:flex text-gray-900 w-full justify-center items-center lg:gap-10 grid max-lg:space-y-5">
            <div className="flex space-x-2">
                <h1>Items : </h1>
                <h1 className="font-bold">1</h1>
            </div>
            <div className="flex space-x-2">
                <h1>Total : </h1>
                <h1 className="font-bold">Rp.24000</h1>
            </div>
            <div className="flex space-x-2">
                <h1>Diskon : </h1>
                <h1 className="font-bold">Rp.2000</h1>
            </div>
            <div className="flex space-x-2">
                <h1>Biaya Pengiriman : </h1>
                <h1 className="font-bold">Rp.10000</h1>
            </div>
            <div className="flex space-x-2">
                <h1>Grand Total : </h1>
                <h1 className="font-bold">Rp.32000</h1>
            </div>
        </div>
    )
}
export default TableTotal