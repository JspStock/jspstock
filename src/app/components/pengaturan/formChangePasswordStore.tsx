"use client"

import { checkPasswordStore, updatePasswordStore } from "@/app/(public)/(main)/pengaturan/profil/action"
import { errorAlert } from "@/utils/alert/swal"
import { useFormik } from "formik"
import { signOut } from "next-auth/react"
import { object, string } from "yup"

interface Form{
    password: string,
    newPassword: string
}

const FormChangePasswordStore = () => {
    const formSchema = object().shape({
        password: string().required('Kata sandi tidak boleh kosong!'),
        newPassword: string().required('Kata sandi tidak boleh kosong!')
    })

    const form = useFormik<Form>({
        initialValues: {
            password: '',
            newPassword: ''
        },
        validationSchema: formSchema,
        onSubmit: async (e, { setFieldError }) => {
            try{
                const checkPassword = await checkPasswordStore(e.password)
                if(checkPassword){
                    await updatePasswordStore(e.newPassword)
                    await signOut()
                }else{
                    setFieldError('password', 'Kata sandi salah')
                }
            }catch{
                errorAlert()
            }
        }
    })
    const { handleChange, handleSubmit, values, errors, isSubmitting } = form

    return <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5" onSubmit={handleSubmit}>
        <section>
            <label htmlFor="" className="label">
                <span className="label-text">Masukan kata sandi lama</span>
            </label>

            <input type="password" className="input input-bordered w-full" placeholder="Masukan kata sandi" name="password" value={values.password} onChange={handleChange} />
            { errors.password ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{ errors.password }</span></label> : null }
        </section>

        <section>
            <label htmlFor="" className="label">
                <span className="label-text">Masukan kata sandi baru</span>
            </label>

            <input type="password" className="input input-bordered w-full" placeholder="Masukan kata sandi" name="newPassword" value={values.newPassword} onChange={handleChange} />
            { errors.newPassword ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{ errors.newPassword }</span></label> : null }
        </section>

        <button type="submit" className="btn bg-blue-900 text-white w-fit" disabled={isSubmitting}>
            { isSubmitting ? <div className="loading"></div> : null }
            <span>Simpan</span>
        </button>
    </form>
}

export default FormChangePasswordStore