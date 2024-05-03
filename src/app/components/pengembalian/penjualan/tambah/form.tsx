"use client"

import { addData } from "@/app/(public)/(main)/pengembalian/penjualan/tambah/actions"
import { CustomerUser, Product, SavingAccounts } from "@/app/(public)/(main)/pengembalian/penjualan/tambah/page"
import { useFormik } from "formik"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import { array, object, string } from "yup"

const ComboboxCustomer = dynamic(() => import('@/app/components/comboBoxInput'))
const ComboboxProduct = dynamic(() => import('@/app/components/comboBoxInput'))
const OrderTable = dynamic(() => import('@/app/components/pengembalian/penjualan/tambah/orderTable'))

export interface Order {
    id: string,
    name: string,
    qty: number,
    price: number,
}

export interface Form {
    order: Array<Order>,
    savingAccounts: string,
    customer: string,
    notes: string
}

const Form = ({ customerUser, product, savingAccounts }: {
    customerUser: Array<CustomerUser>,
    product: Array<Product>,
    savingAccounts: Array<SavingAccounts>
}) => {
    const router = useRouter()
    const formSchema = object().shape({
        customer: string().required("Kustomer tidak boleh kosong!"),
        order: array().min(1, "Order tidak boleh kosong!"),
        savingAccounts: string().required('Rekening tidak boleh kosong!')
    })

    const form = useFormik<Form>({
        initialValues: {
            order: [],
            savingAccounts: '',
            customer: '',
            notes: ''
        },
        validationSchema: formSchema,
        onSubmit: async e => {
            try{
                await addData(e)
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
            <div className=" gap-5 mt-5">
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Costomer*(Wajib)</span>
                    </div>
                    <ComboboxCustomer
                        data={customerUser}
                        selected={customerUser.find(e => values.customer == e.id)}
                        setSelected={(e: CustomerUser) => setFieldValue("customer", e.id)} />
                    {errors.customer ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{errors.customer}</span></label> : null}
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Pilih Produk*(Wajib)</span>
                    </div>
                    <ComboboxProduct
                        data={product}
                        selected={""}
                        setSelected={(e: Product) => setFieldValue("order", [...values.order, { ...e, qty: 1 }])} />
                </label>

                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Rekening*(Wajib)</span>
                    </div>
                    <ComboboxProduct
                        data={savingAccounts}
                        selected={savingAccounts.find(e => e.id == values.savingAccounts)}
                        setSelected={(e: SavingAccounts) => setFieldValue("savingAccounts", e.id)} />
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