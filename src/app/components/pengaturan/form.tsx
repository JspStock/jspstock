"use client"

import { GetProfileDataPayload, getCountDataByEmail, getCountDataByNoWa, getCountDataByUsername, updateData } from "@/app/(public)/(main)/pengaturan/profil/action"
import { useFormik } from "formik"
import { signOut } from "next-auth/react"
import Swal from "sweetalert2"
import { object, string } from "yup"

export interface Form{
    username: string,
    name: string,
    noWa: string,
    email: string
}

const Form = ({ data }: {
    data: GetProfileDataPayload
}) => {
    const formSchema = object().shape({
        username: string().required('Nama pengguna tidak boleh kosong!'),
        email: string().required('Email tidak boleh kosong!').email('Format email tidak benar!'),
        noWa: string().required('Nomor WhatsApp tidak boleh kosong!'),
        name: string().required("Nama tidak boleh kosong!")
    })

    const form = useFormik<Form>({
        initialValues: {
            username: data.username,
            noWa: data.noWa,
            email: data.email,
            name: data.name
        },
        validationSchema: formSchema,
        onSubmit: async (e, { setFieldError }) => {
            try{
                let isValid: boolean = true
    
                if(data.username != e.username){
                    const checkData = await getCountDataByUsername(e.username)
                    if(checkData > 0){
                        setFieldError("username", "Nama pengguna sudah tersedia!")
                        isValid = false
                    }
                }
    
                if(data.email != e.email){
                    const checkData = await getCountDataByEmail(e.email)
                    if(checkData > 0){
                        setFieldError("email", "Email sudah tersedia!")
                        isValid = false
                    }
                }
    
                if(data.noWa != e.noWa){
                    const checkData = await getCountDataByNoWa(e.noWa)
                    if(checkData > 0){
                        setFieldError("noWa", "Nomor WhatsApp telah tersedia!")
                        isValid = false
                    }
                }
    
                if(isValid){
                    await updateData(data.id, e)
                    await signOut()
                }
            }catch{
                Swal.fire({
                    icon: 'error',
                    title: 'Terjadi kesalahan!',
                    text: 'Kesalahan pada server, silahkan coba kembali beberapa saat.'
                })
            }
        }
    })
    const { errors, values,isSubmitting,handleChange, handleSubmit } = form

    return (
        <form className="mt-10" onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-2 gap-5 mt-5">
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Nama*(Wajib)</span>
                    </div>
                    <input type="text" placeholder="Masukkan Nama" className="input input-bordered w-full max-w-xs" name="name" value={values.name} onChange={handleChange} />
                    { errors.name ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{ errors.name }</span></label> : null }
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Nama Pengguna*(Wajib)</span>
                    </div>
                    <input type="text" placeholder="Masukkan Nama" className="input input-bordered w-full max-w-xs" name="username" value={values.username} onChange={handleChange} />
                    { errors.username ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{ errors.username }</span></label> : null }
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Email*(Wajib)</span>
                    </div>
                    <input type="text" placeholder="Masukkan Email" className="input input-bordered w-full max-w-xs" name="email" value={values.email} onChange={handleChange} />
                    { errors.email ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{ errors.email }</span></label> : null }
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Nomor WhatsApp*(Wajib)</span>
                    </div>
                    <input type="text" placeholder="Masukkan Nomor WhatsApp" className="input input-bordered w-full max-w-xs" name="noWa" value={values.noWa} onChange={handleChange} />
                    { errors.noWa ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{ errors.noWa }</span></label> : null }
                </label>
            </div>
            <button className="btn bg-blue-900 my-5 text-white" type="submit" disabled={isSubmitting}>
                { isSubmitting ? <div className="loading"></div> : null }
                <span>Simpan</span>
            </button>
        </form>
    )
}
export default Form