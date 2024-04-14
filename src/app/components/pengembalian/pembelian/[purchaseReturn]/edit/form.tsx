"use client"

import { updateData } from "@/app/(public)/(main)/pengembalian/pembelian/[purchaseReturn]/edit/action"
import { Supplier, Product, SavingAccount, PurchaseReturn } from "@/app/(public)/(main)/pengembalian/pembelian/[purchaseReturn]/edit/page"
import { useFormik } from "formik"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import { array, object, string } from "yup"

const Combobox = dynamic(() => import('@/app/components/comboBoxInput'))
const OrderTable = dynamic(() => import('@/app/components/pengembalian/pembelian/[purchaseReturn]/edit/orderTable'))

export interface Order {
    id: string,
    name: string,
    qty: number,
    price: number,
}

export interface Form {
    order: Array<Order>,
    savingAccounts: string,
    supplier: string,
    notes: string
}

const Form = ({ supplier, product, savingAccount, purchaseReturn }: {
    supplier: Array<Supplier>,
    product: Array<Product>,
    savingAccount: Array<SavingAccount>,
    purchaseReturn: PurchaseReturn
}) => {
    const router = useRouter()
    const formSchema = object().shape({
        supplier: string().required("Kustomer tidak boleh kosong!"),
        order: array().min(1, "Order tidak boleh kosong!"),
        savingAccounts: string().required('Rekening tidak boleh kosong!')
    })

    const form = useFormik<Form>({
        initialValues: {
            order: purchaseReturn.purchaseReturnOrders.map(e => ({
                id: e.product!.id,
                qty: e.qty,
                name: e.product!.name,
                price: e.product!.price
            })),
            savingAccounts: purchaseReturn.idSavingAccount ?? '',
            supplier: purchaseReturn.idSupplier ?? '',
            notes: purchaseReturn.notes ?? ''
        },
        validationSchema: formSchema,
        onSubmit: async e => {
            try{
                await updateData(purchaseReturn.id, e)
                router.push('/pengembalian/penjualan')
            }catch{
                Swal.fire({
                    icon: 'error',
                    title: 'Terjadi kesalahan!',
                    text: 'Kesalahan pada server, silahkan coba kembali beberapa saat.'
                })
            }
        }
    })
    const { handleChange, handleSubmit, values, errors, isSubmitting, setFieldValue } = form

    return (
        <form className="mt-10" onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-2 gap-5 mt-5">
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Supplier*(Wajib)</span>
                    </div>
                    <Combobox
                        data={supplier}
                        selected={supplier.find(e => values.supplier == e.id)}
                        setSelected={(e: Supplier) => setFieldValue("supplier", e.id)} />
                    {errors.supplier ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{errors.supplier}</span></label> : null}
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Pilih Produk*(Wajib)</span>
                    </div>
                    <Combobox
                        data={product}
                        selected={""}
                        setSelected={(e: Product) => setFieldValue("order", [...values.order, { ...e, qty: 1 }])} />
                </label>

                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Rekening*(Wajib)</span>
                    </div>
                    <Combobox
                        data={savingAccount}
                        selected={savingAccount.find(e => e.id == values.savingAccounts)}
                        setSelected={(e: SavingAccount) => setFieldValue("savingAccounts", e.id)} />
                    {errors.savingAccounts ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{errors.savingAccounts}</span></label> : null}
                </label>

                <div className="col-span-2">
                    <label htmlFor="" className="label">
                        <span className="label-text">Tabel order*</span>
                    </label>
                    <OrderTable
                        order={values.order}
                        onDeleteItem={(val: number) => setFieldValue("order", [...values.order].filter((_, index) => index != val))}
                        onChangeQtyItem={(index: number, val: number) => setFieldValue(`order[${index}].qty`, val)} />
                    {errors.order ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{errors.order.toString()}</span></label> : null}
                </div>

                <label className="form-control w-full col-span-2">
                    <div className="label">
                        <span className="label-text">Catatan</span>
                    </div>
                    <textarea className="textarea textarea-bordered" placeholder="Catatan" name="notes" onChange={handleChange} value={values.notes}></textarea>
                </label>
            </div>

            <button className="btn bg-blue-900 my-5 text-white" disabled={isSubmitting}>
                {isSubmitting ? <div className="loading"></div> : null}
                <span>Simpan</span>
            </button>
        </form>
    )
}
export default Form