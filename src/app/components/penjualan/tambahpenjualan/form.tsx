"use client"

import { GetProductPayload, addData, getCountDataById } from "@/app/(public)/(main)/penjualan/tambahpenjualan/action"
import { Customer, SavingAccounts } from "@/app/(public)/(main)/penjualan/tambahpenjualan/page"
import { $Enums } from "@prisma/client"
import { useFormik } from "formik"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import { array, mixed, object, ref, string } from "yup"

const Tabletambahpenjualan = dynamic(() => import("@/app/components/penjualan/tambahpenjualan/tabletambahpenjualan"))
const TableTotal = dynamic(() => import("@/app/components/penjualan/tambahpenjualan/tabletotal"))
const Comboboxcostomer = dynamic(() => import("@/app/components/comboBoxInput"))
const Comboboxproduk = dynamic(() => import("@/app/components/comboBoxInput"))

export interface Order {
    id: string,
    name: string,
    qty: string
}

export interface Form {
    order: Array<Order>,
    customer: Customer | undefined,
    savingAccount: string,
    discount: string | undefined,
    shippingCost: string | undefined,
    saleNotes: string | undefined,
    staffNotes: string | undefined
}

export type FormWithoutDocument = Omit<Form, 'document'>
const Form = ({ product, customer, savingAccounts }: {
    product: Array<GetProductPayload>,
    customer: Array<Customer>,
    savingAccounts: Array<SavingAccounts>
}) => {
    const router = useRouter()
    const formSchema = object().shape({
        order: array().min(1, "Order tidak boleh kosong!"),
        ref: string(),
        customer: mixed().required('Kustomer tidak boleh kosong!'),
        saleStatus: string().required("Status penjualan tidak boleh kosong!"),
        salePurchaseStatus: string().required("Status pembayaran tidak boleh kosong!"),
        savingAccount: string().required("Rekening harus diisi!")
    })

    const form = useFormik<Form>({
        initialValues: {
            order: [],
            customer: undefined,
            discount: undefined,
            shippingCost: undefined,
            saleNotes: undefined,
            staffNotes: undefined,
            savingAccount: ""
        },
        validationSchema: formSchema,
        onSubmit: async e => {
            try{
                router.push('/penjualan/listpenjualan')
            }catch{
                Swal.fire({
                    icon: 'error',
                    title: 'Terjadi kesalahan!',
                    text: 'Kesalahan saat menambahkan data, coba kembali beberapa saat dan pastikan jaringan terhubung internet.'
                })
            }
        }
    })

    const { handleSubmit, handleChange, values, errors, touched, isSubmitting, setFieldValue, setFieldError } = form
    const handleChangeProduct = (e: GetProductPayload) => setFieldValue("order", [...values.order, { ...e, qty: 1 }])
    const handleDeleteItemProuct = (val: number) => setFieldValue("order", [...values.order].filter((_, index) => index != val))
    const handleChangeQtyItemProduct = (index: number, qty: string) => setFieldValue(`order[${index}].qty`, qty)

    return (
        <form className="mt-10" onSubmit={handleSubmit}>
            <div className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Pilih Produk*(Wajib)</span>
                </div>
                <Comboboxproduk
                    data={product}
                    selected={""}
                    setSelected={handleChangeProduct} />
            </div>

            <Tabletambahpenjualan
                order={values.order}
                product={product}
                onDeleteItem={handleDeleteItemProuct}
                onChangeQtyItem={handleChangeQtyItemProduct} />
            {errors.order && touched.order ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{errors.order.toString()}</span></label> : null}

            <h1 className="py-2 text-gray-900">Dokumen</h1>
            <input type="file" className="file-input file-input-bordered w-full max-w-xs" onChange={e => setFieldValue("document", e.target.files![0])} />

            <div className="grid lg:grid-cols-2 gap-5 mt-5">
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Kustomer*(Wajib)</span>
                    </div>
                    <Comboboxcostomer
                        data={customer.map(e => ({ id: e.id, name: e.name }))}
                        selected={values.customer}
                        setSelected={(e: Customer) => setFieldValue("customer", e)} />
                    {errors.customer && touched.customer ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{errors.customer}</span></label> : null}
                </label>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Rekening*(Wajib)</span>
                    </div>
                    <select className="bg-gray-50 border input input-bordered w-full max-w-xs" name="savingAccount" value={values.savingAccount} onChange={handleChange}>
                        <option value="" className="text-gray-200">Rekening</option>
                        { savingAccounts.map((e, index) => <option key={index} value={e.id}>{ e.name }</option>) }
                    </select>
                    {errors.savingAccount && touched.savingAccount ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{errors.savingAccount}</span></label> : null}
                </label>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Diskon</span>
                    </div>
                    <input type="text" placeholder="Diskon" className="input input-bordered w-full max-w-xs" name="discount" value={values.discount} onChange={handleChange} />
                </label>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Biaya Pengiriman</span>
                    </div>
                    <input type="text" placeholder="Biaya" className="input input-bordered w-full max-w-xs" name="shippingCost" value={values.shippingCost} onChange={handleChange} />
                    {errors.shippingCost && touched.shippingCost ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{errors.shippingCost}</span></label> : null}
                </label>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Catatan Penjualan</span>
                    </div>
                    <textarea className="textarea textarea-bordered" placeholder="Catatan" name="saleNotes" value={values.saleNotes} onChange={handleChange}></textarea>
                    {errors.saleNotes && touched.saleNotes ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{errors.saleNotes}</span></label> : null}
                </label>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Catatan Staff Admin</span>
                    </div>
                    <textarea className="textarea textarea-bordered" placeholder="Catatan" name="staffNotes" value={values.staffNotes} onChange={handleChange}></textarea>
                    {errors.staffNotes && touched.staffNotes ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{errors.staffNotes}</span></label> : null}
                </label>
            </div>

            <TableTotal
                discount={parseInt(values.discount ?? '0')}
                shippingCost={parseInt(values.shippingCost ?? '0')}
                order={values.order}
                product={product} />
            <button type="submit" className="btn bg-blue-900 my-5 text-white" disabled={isSubmitting}>
                { isSubmitting ? <div className="loading"></div> : null }
                <span>Simpan</span>
            </button>
        </form>
    )
}
export default Form