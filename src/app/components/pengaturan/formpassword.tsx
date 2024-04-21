"use client"

import { checkPassword, updatePassword } from "@/app/(public)/(main)/pengaturan/profil/action"
import { useFormik } from "formik"
import { signOut } from "next-auth/react"
import Swal from "sweetalert2"
import { object, string } from "yup"

export interface Form{
    oldPassword: string,
    newPassword: string
}

const Form = ({ id }: {
    id: string
}) => {
    const formSchema = object().shape({
        oldPassword: string().required("Kata sandi tidak boleh kosong!").min(8, "Minimal kata sandi harus 8 karakter"),
        newPassword: string().required("Kata sandi tidak boleh kosong!").min(8, 'Minimal kata sandi harus 8 karakter')
    })

    const form = useFormik<Form>({
        initialValues: {
            oldPassword: '',
            newPassword: ''
        },
        validationSchema: formSchema,
        onSubmit: async (e, {setFieldError}) => {
            try{
                let isValid = true

                if(!(await checkPassword(id, e.oldPassword))){
                    setFieldError("oldPassword", "Kata sandi salah!")
                    isValid = false
                }

                if(e.oldPassword == e.newPassword){
                    setFieldError("newPassword", 'Kata sandi tidak boleh sama')
                    isValid = false
                }

                if(isValid){
                    await updatePassword(id, e.newPassword)
                    signOut()
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
    const { values,errors, handleChange, handleSubmit, isSubmitting } = form

    return (
        <form className="mt-10" onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-2 gap-5 mt-5">
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Kata Sandi Saat ini*(Wajib)</span>
                    </div>
                    <input type="text" placeholder="Masukkan Kata sandi saat ini" className="input input-bordered w-full max-w-xs" name="oldPassword" value={values.oldPassword} onChange={handleChange} />
                    { errors.oldPassword ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{ errors.oldPassword }</span></label> : null }
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Kata Sandi Baru*(Wajib)</span>
                    </div>
                    <input type="text" placeholder="Masukkan Kata sandi baru" className="input input-bordered w-full max-w-xs" name="newPassword" value={values.newPassword} onChange={handleChange} />
                    { errors.newPassword ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{ errors.newPassword }</span></label> : null }
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