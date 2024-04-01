"use client"

import { checkEmail, checkNoWa, createSupplier } from "@/app/(public)/(main)/pengguna/supplier/tambah/action"
import { useFormik } from "formik"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import { object, string } from "yup"

export interface Form {
    name: string,
    email: string,
    noWa: string,
    address: string,
    city: string,
    zipCode: string,
    region: string
}

const Form = () => {
    const router = useRouter()

    const formSchema = object().shape({
        name: string().required('Nama tidak boleh kosong!'),
        email: string().required('Email tidak boleh kosong!').email('Format email tidak benar!'),
        noWa: string().required('Nomor WhatsApp tidak boleh kosong!'),
        city: string().required('Kota tidak boleh kosong!'),
        zipCode: string().required("Kode pos tidak boleh kosong!"),
        region: string().required('Wilayah tidak boleh kosong!')
    })

    const form = useFormik<Form>({
        initialValues: {
            name: '',
            email: '',
            noWa: '',
            city: '',
            zipCode: '',
            region: '',
            address: ''
        },
        validationSchema: formSchema,
        onSubmit: async e => {
            try {
                let isError = false
                const emailCount = await checkEmail(e.email)
                const noWaCount = await checkNoWa(e.noWa)

                if(emailCount > 0){
                    form.setFieldError("email", "Email sudah tersedia!")
                    isError = true
                }

                if(noWaCount > 0){
                    form.setFieldError("noWa", "Nomor WhatsApp sudah tersedia!")
                    isError = true
                }

                if (!isError) {
                    await createSupplier(e)
                    router.replace('/pengguna/supplier')
                } else {
                    form.setSubmitting(false)
                }
            } catch {
                Swal.fire({
                    icon: 'error',
                    title: 'Terjadi kesalahan!',
                    text: 'Kesalahan saat menambahkan data, coba kembali beberapa saat dan pastikan koneksi jaringan stabil!'
                })
            }
        }
    })

    const { handleChange, handleSubmit, values, errors, touched, isSubmitting } = form
    return (
        <form className="mt-10" onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-2 gap-5 mt-5">
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Nama*(Wajib)</span>
                    </div>
                    <input type="text" className="input input-bordered w-full max-w-xs" name="name" value={values.name} onChange={handleChange} placeholder="Masukan nama" />
                    {errors.name && touched.name ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{errors.name}</span></label> : null}
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Email*(Wajib)</span>
                    </div>
                    <input type="text" placeholder="Masukkan Email" className="input input-bordered w-full max-w-xs" name="email" value={values.email} onChange={handleChange} />
                    {errors.email && touched.email ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{errors.email}</span></label> : null}
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">No WhatsApp*(Wajib)</span>
                    </div>
                    <input type="number" placeholder="Masukkan Nomor Referensi" className="input input-bordered w-full max-w-xs" name="noWa" value={values.noWa} onChange={handleChange} />
                    {errors.noWa && touched.noWa ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{errors.noWa}</span></label> : null}
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Alamat</span>
                    </div>
                    <textarea className="textarea textarea-bordered" placeholder="Alamat"></textarea>
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Kota*(Wajib)</span>
                    </div>
                    <input type="text" placeholder="Masukkan Kota" className="input input-bordered w-full max-w-xs" name="city" value={values.city} onChange={handleChange} />
                    {errors.city && touched.city ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{errors.city}</span></label> : null}
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Kode Pos*(Wajib)</span>
                    </div>
                    <input type="number" placeholder="Masukkan Kode Pos" className="input input-bordered w-full max-w-xs" name="zipCode" value={values.zipCode} onChange={handleChange} />
                    {errors.zipCode && touched.zipCode ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{errors.zipCode}</span></label> : null}
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Wilayah*(Wajib)</span>
                    </div>
                    <input type="text" placeholder="Masukkan Wilayah" className="input input-bordered w-full max-w-xs" name="region" value={values.region} onChange={handleChange} />
                    {errors.region && touched.region ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{errors.region}</span></label> : null}
                </label>
            </div>
            <button type="submit" className="btn bg-blue-900 my-5 text-white" disabled={isSubmitting}>
                {isSubmitting ? <div className="loading"></div> : null}
                <span>Simpan</span>
            </button>
        </form>
    )
}
export default Form