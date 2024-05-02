"use client"

import { addData } from "@/app/(public)/(main)/pemaketan/listpemaketan/input/action"
import { CustomerUser, Sales } from "@/app/(public)/(main)/pemaketan/listpemaketan/input/page"
import { useFormik } from "formik"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Swal from "sweetalert2"
import { object, string } from "yup"

const ComboBox = dynamic(() => import('@/app/components/comboBoxInput'))

export interface Form {
    file: File | null,
    idSale: string,
    idCustomerUser: string,
    address: string,
    notes: string
}

export interface FormWithoutFile{
    idSale: string,
    idCustomerUser: string,
    address: string,
    notes: string
}

const Form = ({ customerUser, sales }: {
    customerUser: Array<CustomerUser>,
    sales: Array<Sales>
}) => {
    const router = useRouter()
    const formSchema = object().shape({
        idSale: string().required('Penjualan tidak boleh kosong!'),
        idCustomerUser: string().required('Kustomer tidak boleh kosong!'),
        address: string().required('Alamat tidak boleh kosong!')
    })

    const form = useFormik<Form>({
        initialValues: {
            file: null,
            idSale: '',
            idCustomerUser: '',
            address: '',
            notes: ''
        },
        validationSchema: formSchema,
        onSubmit: async e => {
            try{
                let document: string | null = null
                if(e.file){
                    document = `data:${e.file.type};base64,${Buffer.from(await e.file.arrayBuffer()).toString("base64")}`
                }

                await addData({
                    idSale: e.idSale,
                    address: e.address,
                    idCustomerUser: e.idCustomerUser,
                    notes: e.notes
                }, document)
                router.push('/pemaketan/listpemaketan')
            }catch{
                Swal.fire({
                    icon: 'error',
                    title: "Terjadi kesalahan!",
                    text: 'Kesalahan pada server, coba kembali beberapa saat.'
                })
            }
        }
    })
    const { handleSubmit, handleChange, values, errors, setFieldValue, isSubmitting } = form
    useEffect(() => {
        if(values.idCustomerUser.trim() != ''){
            const customer = customerUser.find(e => e.id == values.idCustomerUser)
            setFieldValue("address", `${customer?.name}\n${customer?.address}`)
        }
    }, [values.idCustomerUser])

    return (
        <form className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-3" onSubmit={handleSubmit}>
            <div className="form-control col-span-2">
                <label htmlFor="" className="label">
                    <span className="label-text">Berkas</span>
                </label>
                <input type="file" className="file-input file-input-bordered" name="file" onChange={e => setFieldValue("file", e.target.files![0])} />
            </div>

            <div className="form-control">
                <label htmlFor="" className="label">
                    <span className="label-text">Penjualan*</span>
                </label>
                <ComboBox
                    data={sales.map(e => ({ id: e.id, name: e.id }))}
                    selected={{ id: sales.find(e => e.id == values.idSale)?.id, name: sales.find(e => e.id == values.idSale)?.id }}
                    setSelected={(e: Sales) => setFieldValue("idSale", e.id)} />
                {errors.idSale ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{errors.idSale}</span></label> : null}
            </div>

            <div className="form-control">
                <label htmlFor="" className="label">
                    <span className="label-text">Kustomer*</span>
                </label>
                <ComboBox
                    data={customerUser}
                    selected={customerUser.find(e => e.id == values.idCustomerUser)}
                    setSelected={(e: CustomerUser) => setFieldValue("idCustomerUser", e.id)} />
                {errors.idCustomerUser ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{errors.idCustomerUser}</span></label> : null}
            </div>

            <div className="form-control">
                <label htmlFor="" className="label">
                    <span className="label-text">Alamat*</span>
                </label>
                <textarea rows={6} className="textarea textarea-bordered" name="address" value={values.address} onChange={handleChange}></textarea>
                { errors.address ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{ errors.address }</span></label> : null }
            </div>

            <div className="form-control">
                <label htmlFor="" className="label">
                    <span className="label-text">Catatan</span>
                </label>
                <textarea rows={6} className="textarea textarea-bordered" name="notes" value={values.notes} onChange={handleChange}></textarea>
                { errors.notes ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{ errors.notes }</span></label> : null }
            </div>

            <button className="btn bg-blue-900 my-5 text-white col-span-2 max-w-fit" disabled={isSubmitting}>
                { isSubmitting ? <div className="loading"></div> : null }
                <span>Simpan</span>
            </button>
        </form>
    )
}
export default Form