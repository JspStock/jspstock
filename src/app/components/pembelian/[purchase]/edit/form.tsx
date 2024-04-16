"use client"

import { Product, PurchaseData, SavingAccounts, Supplier } from "@/app/(public)/(main)/pembelian/[purchase]/edit/page"
import { useFormik } from "formik"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import { array, object, string } from "yup"
import TableTotal from "./tabletotal"
import Tabletambahpembelian, { Order } from "./tabletambahpembelian"
import { $Enums } from "@prisma/client"
import { updatePurchase } from "@/app/(public)/(main)/pembelian/[purchase]/edit/action"
import useStore from "@/app/(public)/(main)/pembelian/listpembelian/store"

const SupplierComboBox = dynamic(() => import('@/app/components/comboBoxInput'))
const ProductComboBox = dynamic(() => import('@/app/components/comboBoxInput'))

export interface Form {
    order: Array<Order>,
    product: Product | null,
    document: File | null,
    supplier: Supplier | null,
    savingAccount: string,
    purchaseStatus: string,
    discount: number,
    shippingCost: number,
    note: string
}

export interface FormWithoutFile{
    order: Array<Order>,
    product: Product | null,
    supplier: Supplier | null,
    savingAccount: string,
    purchaseStatus: string,
    discount: number,
    shippingCost: number,
    note: string
}

const Form = ({ product, supplier, data, savingAccounts }: {
    product: Array<Product>,
    supplier: Array<Supplier>,
    data: PurchaseData,
    savingAccounts: Array<SavingAccounts>
}) => {
    const reset = useStore(state => state.reset)
    const router = useRouter()
    const formSchema = object().shape({
        order: array().min(1, 'Order produk harus terisi!'),
        purchaseStatus: string().required('Status pembelian harus diisi!'),
        savingAccount: string().required('Rekening harus diisi!')
    })

    const form = useFormik<Form>({
        initialValues: {
            order: data.purchaseOrder.map(e => ({
                id: e.product!.id,
                name: e.product!.name,
                price: e.product!.price,
                selectQty: e.qty,
                subTotal: e.qty * e.product!.price,
            })),
            product: null,
            document: null,
            supplier: data.supplier,
            purchaseStatus: data.purchaseStatus,
            discount: data.discount,
            shippingCost: data.shippingCost,
            note: data.notes ?? '',
            savingAccount: data.idSavingAccount ?? ''
        },
        validationSchema: formSchema,
        onSubmit: async e => {
            try {
                if(e.order.length == 0){
                    form.setFieldError("order", "Order produk harus diisi!")
                    return false
                }

                let file: string | null = null
                if(e.document){
                    file = `data:${e.document.type};base64,${Buffer.from(await e.document.arrayBuffer()).toString('base64')}`
                }

                await updatePurchase(
                    data.id,
                    {
                        discount: e.discount,
                        note: e.note,
                        order: e.order,
                        product: e.product,
                        purchaseStatus: e.purchaseStatus,
                        savingAccount: e.savingAccount,
                        shippingCost: e.shippingCost,
                        supplier: e.supplier
                    },
                    file
                )
                router.push("/pembelian/listpembelian")
                reset()
            } catch(e) {
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
                        <span className="label-text">Rekening</span>
                    </div>
                    <select className="bg-gray-50 border input input-bordered w-full max-w-xs capitalize" name="savingAccount" defaultValue={values.savingAccount} onChange={handleChange}>
                        <option value="" disabled>Pilih rekening</option>
                        { savingAccounts.map((e, index) => <option key={index} value={e.id}>{e.name}</option>) }
                    </select>
                    {touched.savingAccount && errors.savingAccount ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{errors.savingAccount}</span></label> : null}
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Status Pembelian</span>
                    </div>
                    <select className="bg-gray-50 border input input-bordered w-full max-w-xs capitalize" name="purchaseStatus" defaultValue={values.purchaseStatus} onChange={handleChange}>
                        <option value="" disabled>Pilih status pembelian</option>
                        {Object.keys($Enums.PurchaseStatus).map(key => <option value={key} key={key}>{key.split("_").join(" ").toLowerCase()}</option>)}
                    </select>
                    {touched.purchaseStatus && errors.purchaseStatus ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{errors.purchaseStatus}</span></label> : null}
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Diskon</span>
                    </div>
                    <input type="number" placeholder="Diskon" className="input input-bordered w-full max-w-xs" name="discount" value={values.discount} onChange={handleChange} />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Biaya Pengiriman</span>
                    </div>
                    <input type="number" placeholder="Biaya" className="input input-bordered w-full max-w-xs" name="shippingCost" value={values.shippingCost} onChange={handleChange} />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Catatan</span>
                    </div>
                    <textarea className="textarea textarea-bordered" placeholder="Catatan" name="note" value={values.note} onChange={handleChange}></textarea>
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