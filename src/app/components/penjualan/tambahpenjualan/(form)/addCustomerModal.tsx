"use client"

import { addData } from "@/app/(public)/(main)/pengguna/costomer/tambah/action"
import { GetCustomerGroupPayload } from "@/app/(public)/(main)/penjualan/tambahpenjualan/action"
import { Form } from "@/app/components/pengguna/costomer/tambah/form"
import { errorAlert } from "@/utils/alert/swal"
import { useFormik } from "formik"
import dynamic from "next/dynamic"
import { forwardRef } from "react"
import { object, string } from "yup"

export interface Props {
    customerGroup: Array<GetCustomerGroupPayload>,
    close?: () => void
}

export type Ref = HTMLDialogElement

const Combobox = dynamic(() => import('@/app/components/comboBoxInput'))

const AddCustomerModal = forwardRef<Ref, Props>((props, ref) => {
    const formSchema = object().shape({
        customerGroup: string().required('Grub kustomer tidak boleh kosong!'),
        name: string().required('Nama tidak boleh kosong!'),
        noWa: string().required('Nomor WhatsApp tidak boleh kosong!'),
        address: string().required('Alamat tidak boleh kosong!')
    })

    const form = useFormik<Form>({
        initialValues: {
            customerGroup: '',
            name: '',
            noWa: '',
            address: ''
        },
        validationSchema: formSchema,
        onSubmit: async e => {
            try{
                await addData(e)
                props.close ? props.close() : null
            }catch{
                errorAlert()
            }
        }
    })
    const { values, handleSubmit, isSubmitting, errors, setFieldValue, handleChange } = form

    return <dialog className="modal" ref={ref}>
        <form className="modal-box" onSubmit={handleSubmit}>
            <h3 className="font-bold text-lg">Tambah kustomer</h3>

            <div className="form-control">
                <label htmlFor="" className="label">
                    <span className="label-text">Grub Kustomer*</span>
                </label>

                <Combobox
                    data={props.customerGroup}
                    selected={props.customerGroup.find(e => e.id == values.customerGroup)}
                    setSelected={(e: GetCustomerGroupPayload) => setFieldValue('customerGroup', e.id)} />
                {errors.customerGroup ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{errors.customerGroup}</span></label> : null}
            </div>

            <div className="form-control">
                <label htmlFor="" className="label">
                    <span className="label-text">Nama</span>
                </label>

                <input type="text" className="input input-bordered" placeholder="Nama kustomer" value={values.name} name="name" onChange={handleChange} />
                {errors.name ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{errors.name}</span></label> : null}
            </div>

            <div className="form-control">
                <label htmlFor="" className="label">
                    <span className="label-text">No WhatsApp*</span>
                </label>

                <input type="text" className="input input-bordered" placeholder="Nomor WhatsApp" name="noWa" value={values.noWa} onChange={handleChange} />
                {errors.noWa ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{errors.noWa}</span></label> : null}
            </div>

            <div className="form-control">
                <label htmlFor="" className="lael">
                    <span className="label-text">Alamat*</span>
                </label>

                <textarea rows={10} className="textarea textarea-bordered" placeholder="Alamat lengkap kustomer" name="address" value={values.address} onChange={handleChange}></textarea>
                {errors.address ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{errors.address}</span></label> : null}
            </div>

            <div className="modal-action">
                <button type="submit" className="btn bg-blue-900 text-white" disabled={isSubmitting}>
                    { isSubmitting ? <div className="loading"></div> : null }
                    <span>Simpan</span>
                </button>
                <button type="button" className="btn" onClick={props.close}>Tutup</button>
            </div>
        </form>
    </dialog>
})

export default AddCustomerModal