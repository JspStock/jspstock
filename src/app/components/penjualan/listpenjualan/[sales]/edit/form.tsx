"use client"

import { GetCustomerGroupPayload, GetDataPayload, GetProductPayload, updateData } from "@/app/(public)/(main)/penjualan/listpenjualan/[sales]/edit/action"
import { Customer, SavingAccounts } from "@/app/(public)/(main)/penjualan/listpenjualan/[sales]/edit/page"
import { useFormik } from "formik"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import { array, object, string } from "yup"
import AddCustomerModal, { Ref } from './(form)/addCustomerModal'
import ScanProductModal, { ScanProductModalRef } from "./(form)/scanProductModal"
import { createRef } from "react"
import useSound from 'use-sound'
import { Result } from "react-zxing"
import { passwordInputAlert } from "@/utils/alert/swal"


const Tabletambahpenjualan = dynamic(() => import("@/app/components/penjualan/listpenjualan/[sales]/edit/tabletambahpenjualan"))
const TableTotal = dynamic(() => import("@/app/components/penjualan/listpenjualan/[sales]/edit/tabletotal"))
const Comboboxcostomer = dynamic(() => import("@/app/components/comboBoxInput"))
const Comboboxproduk = dynamic(() => import("@/app/components/comboBoxInput"))


export interface Order {
    id: string,
    name: string,
    qty: string
}

export interface Form {
    order: Array<Order>,
    customer: string,
    savingAccount: string,
    discount: number,
    shippingCost: number,
    notes: string,
}

export type FormWithoutDocument = Omit<Form, 'document'>
const Form = ({ product, customer, savingAccounts, customerGroup, data }: {
    product: Array<GetProductPayload>,
    customer: Array<Customer>,
    savingAccounts: Array<SavingAccounts>,
    customerGroup: Array<GetCustomerGroupPayload>,
    data: GetDataPayload
}) => {
    const router = useRouter()
    const [play] = useSound("/static/sounds/scan-detect.mp3")
    const addCustomerModalRef = createRef<Ref>()
    const scanProductModalRef = createRef<ScanProductModalRef>()

    const formSchema = object().shape({
        order: array().min(1, "Order tidak boleh kosong!"),
        customer: string().required('Kustomer tidak boleh kosong!'),
        savingAccount: string().required("Rekening harus diisi!")
    })

    const form = useFormik<Form>({
        initialValues: {
            order: data.saleOrder.map(e => ({
                id: e.product.id,
                name: e.product.name,
                qty: e.qty.toString(),
            })),
            customer: data.idCustomerUser ?? '',
            discount: data.discount,
            shippingCost: data.shippingCost,
            notes: data.notes ?? '',
            savingAccount: data.idSavingAccount ?? ''
        },
        validationSchema: formSchema,
        onSubmit: async e => {
            try {
                const confirmPassword = await passwordInputAlert()

                if(confirmPassword){
                    await updateData(data.id, e)
                    router.push('/penjualan/listpenjualan')
                }
            } catch {
                Swal.fire({
                    icon: 'error',
                    title: 'Terjadi kesalahan!',
                    text: 'Kesalahan saat menambahkan data, coba kembali beberapa saat dan pastikan jaringan terhubung internet.'
                })
            }
        }
    })

    const { handleSubmit, handleChange, values, errors, touched, isSubmitting, setFieldValue } = form
    const handleChangeProduct = (e: GetProductPayload) => setFieldValue("order", [...values.order, { ...e, qty: 1 }])
    const handleDeleteItemProuct = (val: number) => setFieldValue("order", [...values.order].filter((_, index) => index != val))
    const handleChangeQtyItemProduct = (index: number, qty: string) => setFieldValue(`order[${index}].qty`, qty)
    const handleScan = (val: Result) => {
        const getProduct = product.find(e => e.code == val.getText())
        if(getProduct != undefined){
            play()
            handleChangeProduct(getProduct)
        }
    }
    

    return <>
        <form className="mt-10" onSubmit={handleSubmit}>
            <div className="flex gap-x-2 items-end">
                <div className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Pilih Produk*(Wajib)</span>
                    </div>
                    <Comboboxproduk
                        data={product.map(e => ({ id: e.id, name: `${e.code} (${e.name})` }))}
                        selected={""}
                        setSelected={handleChangeProduct} />
                </div>

                <div className="tooltip" data-tip="Pindai produk">
                    <button type="button" className="btn btn-ghost btn-circle" onClick={() => scanProductModalRef.current?.showModal()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z" />
                        </svg>
                    </button>
                </div>
            </div>

            <Tabletambahpenjualan
                order={values.order}
                product={product}
                onDeleteItem={handleDeleteItemProuct}
                onChangeQtyItem={handleChangeQtyItemProduct} />
            {errors.order && touched.order ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{errors.order.toString()}</span></label> : null}

            <div className="grid lg:grid-cols-2 gap-5 mt-5">
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Kustomer*(Wajib)</span>
                    </div>

                    <div className="flex items-center gap-x-2">
                        <section className="w-full">
                            <Comboboxcostomer
                                data={customer.map(e => ({ id: e.id, name: e.name }))}
                                selected={customer.find(e => e.id == values.customer)}
                                setSelected={(e: Customer) => setFieldValue("customer", e.id)} />
                            {errors.customer && touched.customer ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{errors.customer}</span></label> : null}
                        </section>

                        <div className="tooltip" data-tip="Tambah kustomer">
                            <button className="btn btn-square" onClick={() => addCustomerModalRef.current?.showModal()}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </label>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Rekening*(Wajib)</span>
                    </div>
                    <select className="bg-gray-50 border input input-bordered w-full max-w-xs" name="savingAccount" value={values.savingAccount} onChange={handleChange}>
                        <option value="" className="text-gray-200">Rekening</option>
                        {savingAccounts.map((e, index) => <option key={index} value={e.id}>{e.name}</option>)}
                    </select>
                    {errors.savingAccount && touched.savingAccount ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{errors.savingAccount}</span></label> : null}
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
                    {errors.shippingCost && touched.shippingCost ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{errors.shippingCost}</span></label> : null}
                </label>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Catatan Penjualan</span>
                    </div>
                    <textarea className="textarea textarea-bordered" placeholder="Catatan" name="notes" value={values.notes} onChange={handleChange}></textarea>
                    {errors.notes && touched.notes ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{errors.notes}</span></label> : null}
                </label>
            </div>

            <TableTotal
                discount={values.discount}
                shippingCost={values.shippingCost}
                order={values.order}
                product={product} />
            <button type="submit" className="btn bg-blue-900 my-5 text-white" disabled={isSubmitting}>
                {isSubmitting ? <div className="loading"></div> : null}
                <span>Simpan</span>
            </button>
        </form>

        <AddCustomerModal
            ref={addCustomerModalRef}
            customerGroup={customerGroup}
            close={() => addCustomerModalRef.current?.close()} />

        <ScanProductModal
            ref={scanProductModalRef}
            onCapture={handleScan} />
    </>
}
export default Form