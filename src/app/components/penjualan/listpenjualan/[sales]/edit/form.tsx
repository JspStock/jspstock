"use client"

import { getCountDataById, updateData } from "@/app/(public)/(main)/penjualan/listpenjualan/[sales]/edit/action"
import { Sales } from "@/app/(public)/(main)/penjualan/listpenjualan/[sales]/edit/page"
import { Customer, Product } from "@/app/(public)/(main)/penjualan/tambahpenjualan/page"
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
    idOrder?: string,
    name: string,
    qty: string,
}

export interface Form {
    order: Array<Order>,
    orderDeleted: Array<Order>,
    document: File | undefined,
    ref: string | undefined,
    customer: Customer | undefined,
    saleStatus: string | undefined,
    salePurchaseStatus: string | undefined,
    discount: string | undefined,
    shippingCost: string | undefined,
    saleNotes: string | undefined,
    staffNotes: string | undefined
}

export type FormWithoutDocument = Omit<Form, 'document'>
const Form = ({ product, customer, sales }: {
    product: Array<Product>,
    customer: Array<Customer>,
    sales: Sales
}) => {
    const router = useRouter()
    const formSchema = object().shape({
        order: array().min(1, "Order tidak boleh kosong!"),
        ref: string().required("Nomor referensi tidak boleh kosong!"),
        customer: mixed().required('Kustomer tidak boleh kosong!'),
        saleStatus: string().required("Status penjualan tidak boleh kosong!"),
        salePurchaseStatus: string().required("Status pembayaran tidak boleh kosong!")
    })

    const form = useFormik<Form>({
        initialValues: {
            order: sales.saleOrder.map(e => ({
                id: e.product.id,
                idOrder: e.id,
                name: e.product.name,
                qty: e.qty.toString(),
            })),
            orderDeleted: [],
            document: undefined,
            ref: sales.id.split("_")[1],
            customer: sales.idCustomerUser ? customer.find(e => e.id == sales.idCustomerUser) : undefined,
            saleStatus: sales.saleStatus,
            salePurchaseStatus: sales.purchaseStatus,
            discount: sales.discount.toString(),
            shippingCost: sales.shippingCost.toString(),
            saleNotes: sales.saleNotes ?? undefined,
            staffNotes: sales.staffNotes ?? undefined
        },
        validationSchema: formSchema,
        onSubmit: async e => {
            try{
                if(e.ref == sales.id){
                    if(await checkIdExists() == false){
                        return false
                    }
                }

                const document = e.document ? `data:${e.document.type};base64,${Buffer.from(await e.document.arrayBuffer()).toString('base64')}` : null
                const formWithoutDocument: Form = {...e}
                delete formWithoutDocument.document
                
                await updateData(sales.id, formWithoutDocument, document)
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
    const checkIdExists = async (): Promise<boolean> => {
        const data = await getCountDataById(values.ref!)
        if(data == 0){
            return true
        }else{
            setFieldError("ref", "Nomor referensi sudah tersedia!")
            return false
        }
    }
    const handleChangeProduct = (e: Product) => setFieldValue("order", [...values.order, { ...e, qty: 1, action: "add" }])
    const handleDeleteItemProuct = (val: number) => {
        setFieldValue('orderDeleted', [...values.orderDeleted, values.order.find((_, index) => index == val)])
        setFieldValue('order', [...values.order].filter((_, index) => index != val))
    }
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
                        <span className="label-text">Nomor Referensi</span>
                    </div>
                    <input type="text" placeholder="Masukkan Nomor Referensi" className="input input-bordered w-full max-w-xs" name="ref" value={values.ref} onChange={handleChange} />
                    {errors.ref && touched.ref ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{errors.ref}</span></label> : null}
                </label>

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
                        <span className="label-text">Status Penjualan*(Wajib)</span>
                    </div>
                    <select className="bg-gray-50 border input input-bordered w-full max-w-xs" name="saleStatus" value={values.saleStatus} onChange={handleChange}>
                        <option value="" className="text-gray-200">Status</option>
                        {Object.keys($Enums.SaleStatus).map(e => <option key={e} value={e} className="capitalize">{e.split("_").join(" ").toLowerCase()}</option>)}
                    </select>
                    {errors.saleStatus && touched.saleStatus ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{errors.saleStatus}</span></label> : null}
                </label>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Status Pembayaran*(Wajib)</span>
                    </div>
                    <select className="bg-gray-50 border input input-bordered w-full max-w-xs" name="salePurchaseStatus" value={values.salePurchaseStatus} onChange={handleChange}>
                        <option value="" className="text-gray-200">Status</option>
                        {Object.keys($Enums.SalePurchaseStatus).map(e => <option key={e} value={e} className="capitalize">{e.split("_").join(" ").toLowerCase()}</option>)}
                    </select>
                    {errors.salePurchaseStatus && touched.salePurchaseStatus ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{errors.salePurchaseStatus}</span></label> : null}
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