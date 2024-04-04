"use client"

import { addPurchase } from "@/app/(public)/(main)/pembelian/tambahpembelian/action"
import { Product, Supplier } from "@/app/(public)/(main)/pembelian/tambahpembelian/page"
import { Order } from "@/app/components/pembelian/tambahpembelian/tabletambahpembelian"
import { $Enums } from "@prisma/client"
import { useFormik } from "formik"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import { array, object } from "yup"

const Tabletambahpembelian = dynamic(() => import("@/app/components/pembelian/tambahpembelian/tabletambahpembelian"))
const TableTotal = dynamic(() => import("@/app/components/pembelian/tambahpembelian/tabletotal"))
const SupplierComboBox = dynamic(() => import('@/app/components/comboBoxInput'))
const ProductComboBox = dynamic(() => import('@/app/components/comboBoxInput'))

export interface Form {
    order: Array<Order>,
    product: Product | null,
    document: File | null,
    supplier: Supplier | null,
    purchaseStatus: string,
    discount: string,
    shippingCost: string,
    note: string
}

const Form = ({ product, supplier }: {
    product: Array<Product>,
    supplier: Array<Supplier>
}) => {
    const router = useRouter()
    const formSchema = object().shape({
        order: array().min(1, 'Order produk harus terisi!'),
    })

    const form = useFormik<Form>({
        initialValues: {
            order: [],
            product: null,
            document: null,
            supplier: null,
            purchaseStatus: '',
            discount: '',
            shippingCost: '',
            note: ''
        },
        validationSchema: formSchema,
        onSubmit: async e => {
            try {
                const formData = new FormData()
                formData.append("order", JSON.stringify(e.order))
                e.document != null ? formData.append("document", e.document) : null
                e.supplier != null ? formData.append("supplier", e.supplier.id) : null
                formData.append('purchaseStatus', e.purchaseStatus)
                e.discount.trim() != '' ? formData.append('discount', e.discount) : null
                e.shippingCost.trim() != '' ? formData.append('shippingCost', e.shippingCost) : null
                e.note.trim() != '' ? formData.append('note', e.note) : null
                await addPurchase(formData)
                router.push("/pembelian/listpembelian")
            } catch {
                Swal.fire({
                    icon: 'error',
                    title: 'Terjadi kesalahan!',
                    text: 'Kesalahan saat memasukan data, silahkan coba kembali beberapa saat dan pastikan koneksi jaringan stabil.'
                })
            }
        }
    })
    const { touched, errors, values, isSubmitting, handleSubmit, handleChange, setFieldValue } = form
    const handleProductInput = (e: Product) => setFieldValue("order", [...values.order, { ...product.filter(val => val.id == e.id)[0], selectQty: 1, subTotal: product.filter(val => val.id == e.id)[0].price }])
    const changeQtyOrder = (id: number, qty: string) => {
        setFieldValue(`order[${id}].selectQty`, parseInt(qty))
        setFieldValue(`order[${id}].subTotal`, values.order[id].price * parseInt(qty))
    }
    const onDeleteOrder = (val: number) => setFieldValue('order', [...values.order].filter((_, index) => index != val))

    return (
        <form className="mt-10 relative" onSubmit={handleSubmit}>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Pilih Produk*(Wajib)</span>
                </div>
                <ProductComboBox
                    data={product.map(e => ({ id: e.id, name: e.name }))}
                    setSelected={handleProductInput}
                    selected={values.product} />
            </label>

            <div className="form-control">
                <Tabletambahpembelian
                    data={values.order}
                    changeQty={changeQtyOrder}
                    onDelete={onDeleteOrder} />

                {touched.order && errors.order ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{errors.order.toString()}</span></label> : null}
            </div>

            <h1 className="py-2 text-gray-900">Dokumen</h1>
            <input type="file" className="file-input file-input-bordered w-full max-w-xs" onChange={e => setFieldValue("document", e.target.files?.item(0))} />
            <div className="grid lg:grid-cols-2 gap-5 mt-5">
                <div className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Supplier</span>
                    </div>

                    <SupplierComboBox
                        data={supplier.map(e => ({ id: e.id, name: e.name }))}
                        setSelected={e => setFieldValue("supplier", e)}
                        selected={values.supplier} />
                </div>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Status Pembelian</span>
                    </div>
                    <select className="bg-gray-50 border input input-bordered w-full max-w-xs capitalize" name="purchaseStatus" onChange={handleChange}>
                        {Object.keys($Enums.PurchaseStatus).map(key => <option value={key} key={key}>{key.split("_").join(" ").toLowerCase()}</option>)}
                    </select>
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Diskon</span>
                    </div>
                    <input type="number" placeholder="Diskon" className="input input-bordered w-full max-w-xs" name="discount" onChange={handleChange} />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Biaya Pengiriman</span>
                    </div>
                    <input type="number" placeholder="Biaya" className="input input-bordered w-full max-w-xs" name="shippingCost" onChange={handleChange} />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Catatan</span>
                    </div>
                    <textarea className="textarea textarea-bordered" placeholder="Catatan" name="note" onChange={handleChange}></textarea>
                </label>
            </div>
            <TableTotal form={values} />
            <button type="submit" className="btn bg-blue-900 my-5 text-white" disabled={isSubmitting}>
                {isSubmitting ? <div className="loading"></div> : null}
                <span>Simpan</span>
            </button>
        </form>
    )
}
export default Form