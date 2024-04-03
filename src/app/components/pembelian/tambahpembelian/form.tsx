"use client"

import { Product, Supplier } from "@/app/(public)/(main)/pembelian/tambahpembelian/page"
import dynamic from "next/dynamic"

const Tabletambahpembelian = dynamic(() => import("@/app/components/pembelian/tambahpembelian/tabletambahpembelian"))
const TableTotal = dynamic(() => import("@/app/components/pembelian/tambahpembelian/tabletotal"))
const SupplierComboBox = dynamic(() => import('@/app/components/comboBoxInput'))
const ProductComboBox = dynamic(() => import('@/app/components/comboBoxInput'))

const Form = ({ product, supplier }: {
    product: Array<Product>,
    supplier: Array<Supplier>
}) => {
    return (
        <form className="mt-10 relative">
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Pilih Produk*(Wajib)</span>
                </div>
                <ProductComboBox data={product} />
            </label>
            <Tabletambahpembelian />
            <h1 className="py-2 text-gray-900">Dokumen</h1>
            <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
            <div className="grid lg:grid-cols-2 gap-5 mt-5">
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Supplier</span>
                    </div>
                    <SupplierComboBox data={supplier} />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Status Pembelian</span>
                    </div>
                    <select id="countries" className="bg-gray-50 border input input-bordered w-full max-w-xs">
                        <option selected className="text-gray-200">Status</option>
                        <option value="">Diterima</option>
                        <option value="">Sebagian</option>
                        <option value="">Tertunda</option>
                        <option value="">Diorder</option>
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
                        <span className="label-text">Catatan</span>
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