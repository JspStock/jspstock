"use client"

import { Product, Supplier } from "@/app/(public)/(main)/penjualan/tambahpenjualan/page"
import { $Enums } from "@prisma/client"
import { useFormik } from "formik"
import dynamic from "next/dynamic"
import { array, object, string } from "yup"

const Tabletambahpenjualan = dynamic(() => import("@/app/components/penjualan/tambahpenjualan/tabletambahpenjualan"))
const TableTotal = dynamic(() => import("@/app/components/penjualan/tambahpenjualan/tabletotal"))
const Comboboxcostomer = dynamic(() => import("@/app/components/comboBoxInput"))
const Comboboxproduk = dynamic(() => import("@/app/components/comboBoxInput"))

const Form = ({ product, supplier }: {
    product: Array<Product>,
    supplier: Array<Supplier>
}) => {
    interface Form{
        order: Array<string>,
        document: File | null,
        ref: string,

    }

    const formSchema = object().shape({
        order: array().min(1, "Order tidak boleh kosong!"),
        saleStatus: string().required("Status penjualan tidak boleh kosong!"),
        salePurchaseStatus: string().required("Status pembayaran tidak boleh kosong!")
    })

    return (
        <form className="mt-10">
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Pilih Produk*(Wajib)</span>
                </div>
                <Comboboxproduk
                    data={product}
                    selected={""}
                    setSelected={() => {}} />
            </label>
            <Tabletambahpenjualan />
            <h1 className="py-2 text-gray-900">Dokumen</h1>
            <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
            <div className="grid lg:grid-cols-2 gap-5 mt-5">
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Nomor Referensi</span>
                    </div>
                    <input type="text" placeholder="Masukkan Nomor Referensi" className="input input-bordered w-full max-w-xs" />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Costomer*(Wajib)</span>
                    </div>
                    <Comboboxcostomer
                        data={supplier}
                        selected={""}
                        setSelected={() => {}} />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Status Penjualan*(Wajib)</span>
                    </div>
                    <select id="countries" className="bg-gray-50 border input input-bordered w-full max-w-xs">
                        <option value="" className="text-gray-200">Status</option>
                        { Object.keys($Enums.SaleStatus).map(e => <option key={e} value={e} className="capitalize">{ e.split("_").join(" ").toLowerCase() }</option>) }
                    </select>
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Status Pembayaran*(Wajib)</span>
                    </div>
                    <select id="countries" className="bg-gray-50 border input input-bordered w-full max-w-xs">
                        <option value="" className="text-gray-200">Status</option>
                        { Object.keys($Enums.SalePurchaseStatus).map(e => <option key={e} value={e} className="capitalize">{ e.split("_").join(" ").toLowerCase() }</option>) }
                    </select>
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Diskon</span>
                    </div>
                    <input type="text" placeholder="Diskon" className="input input-bordered w-full max-w-xs" />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Biaya Pengiriman</span>
                    </div>
                    <input type="text" placeholder="Biaya" className="input input-bordered w-full max-w-xs" />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Catatan Penjualan</span>
                    </div>
                    <textarea className="textarea textarea-bordered" placeholder="Catatan"></textarea>
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Catatan Staff Admin</span>
                    </div>
                    <textarea className="textarea textarea-bordered" placeholder="Catatan"></textarea>
                </label>
            </div>
            <TableTotal />
            <button className="btn bg-blue-900 my-5 text-white">Simpan</button>
        </form>
    )
}
export default Form