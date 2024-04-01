"use client"

import { getUser } from '@/app/(public)/auth/signin/actions'
import { useFormik } from 'formik'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ObjectSchema, object, string } from 'yup'
import { compareSync } from 'bcrypt-ts'

export interface Form {
    username: string,
    password: string
}

const Form = () => {
    const params = useSearchParams()
    const router = useRouter()

    const formSchema: ObjectSchema<Form> = object().shape({
        username: string().required("Nama pengguna wajib diisi!"),
        password: string().required("Kata sandi wajib diisi!").min(8, "Kata sandi harus minimal 8 karakter!")
    })

    const form = useFormik<Form>({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: formSchema,
        onSubmit: async (e) => {
            const user = await getUser(e.username)

            if(user){
                const validatePass = compareSync(e.password, user.password)
                if(validatePass){
                    const result = await signIn('credentials', {
                        ...e,
                        redirect: false,
                    })

                    if(result && result.ok){
                        router.replace(`${params.has('callbackUrl') ? params.get('callbackUrl') : '/dashboard'}`)
                    }
                }else{
                    form.setFieldError("password", 'Kata sandi salah!')
                }
            }else{
                form.setFieldError("username", "Nama pengguna tidak ditemukan!")
            }
        }
    })

    const { errors, handleSubmit, values, touched, handleChange, isSubmitting } = form
    return <form className="card-body" onSubmit={handleSubmit}>
        <div className="form-control">
            <label className="label">
                <span className="label-text">Nama pengguna</span>
            </label>
            <input type="text" placeholder="Nama pengguna" className="input input-bordered" name='username' value={values.username} onChange={handleChange} />
            {errors.username && touched.username ? <label htmlFor="username" className="label"><span className="label-text-alt text-error">{errors.username}</span></label> : null}
        </div>
        <div className="form-control">
            <label className="label">
                <span className="label-text">Kata sandi</span>
            </label>
            <input type="password" placeholder="Kata sandi" className="input input-bordered" name='password' value={values.password} onChange={handleChange} />
            {errors.password && touched.password ? <label htmlFor="password" className="label"><span className="label-text-alt text-error">{errors.password}</span></label> : null}
        </div>

        <div className="form-control mt-6">
            <button className="btn rounded-box bg-blue-950 text-white" disabled={isSubmitting}>
                {isSubmitting ? <div className="loading"></div> : null}
                <span>Masuk</span>
            </button>
        </div>
    </form>
}

export default Form
