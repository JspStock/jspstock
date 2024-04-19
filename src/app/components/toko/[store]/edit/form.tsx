"use client"

import { GetStoreDataPayload, checkCountDataByEmail, checkCountDataByNoWa, updateData } from "@/app/(public)/(main)/toko/[store]/edit/action"
import { useFormik } from "formik"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import { object, string } from "yup"

export interface Form {
    name: string,
    email: string,
    noWa: string,
    address: string
}

const Form = ({ data }: {
    data: GetStoreDataPayload
}) => {
    const router = useRouter()
    const formSchema = object().shape({
        name: string().required('Nama toko tidak boleh kosong!'),
        email: string().required('Email toko tidak boleh kosong!').email('Format email tidak benar!'),
        noWa: string().required('Nomor WhatsApp tidak boleh kosong!')
    })

    const form = useFormik<Form>({
        initialValues: {
            name: data.name,
            email: data.email,
            noWa: data.noWa,
            address: data.address
        },
        validationSchema: formSchema,
        onSubmit: async (e, { setFieldError }) => {
            try {
                const checkNoWa = await checkCountDataByNoWa(e.noWa)
                const checkEmail = await checkCountDataByEmail(e.email)

                if (e.email != data.email) {
                    if (checkEmail > 0) {
                        setFieldError('email', 'Email sudah terdaftar!')
                    }
                }

                if (e.noWa != data.noWa) {
                    if (checkNoWa > 0) {
                        setFieldError('noWa', 'Nomor WhatsApp sudah terdaftar!')
                    }
                }

                if (e.email != data.email && e.noWa != e.noWa) {
                    if (checkEmail == 0 && checkNoWa == 0) {
                        await updateData(data.id, e)
                        router.push('/toko')
                    }
                } else {
                    await updateData(data.id, e)
                    router.push('/toko')
                }
            } catch {
                Swal.fire({
                    icon: 'error',
                    title: 'Terjadi kesalahan!',
                    text: 'Kesalahan pada server, silahkan coba kembali beberapa saat.'
                })
            }
        }
    })
    const { handleChange, handleSubmit, values, errors, isSubmitting } = form

    return (
        <form className="mt-10" onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-2 gap-5 mt-5">
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Nama Toko*(Wajib)</span>
                    </div>
                    <input type="text" placeholder="Masukkan Nama Toko" className="input input-bordered w-full max-w-xs" value={values.name} name="name" onChange={handleChange} />
                    {errors.name ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{errors.name}</span></label> : null}
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">No WhatsApp*(Wajib)</span>
                    </div>
                    <input type="text" placeholder="Masukkan No WhatsApp" className="input input-bordered w-full max-w-xs" value={values.noWa} name="noWa" onChange={handleChange} />
                    {errors.noWa ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{errors.noWa}</span></label> : null}
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Email Toko*(Wajib)</span>
                    </div>
                    <input type="text" placeholder="toko@email.com" className="input input-bordered w-full max-w-xs" name="email" value={values.email} onChange={handleChange} />
                    {errors.email ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{errors.email}</span></label> : null}
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Alamat Toko</span>
                    </div>
                    <textarea className="textarea textarea-bordered" placeholder="Alamat" name="address" value={values.address} onChange={handleChange}></textarea>
                    {errors.address ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{errors.address}</span></label> : null}
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