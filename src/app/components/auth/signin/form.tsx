"use client"

import { checkExistUsername, validatePasswordUser } from '@/app/(public)/auth/signin/actions'
import { useFormik } from 'formik'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ObjectSchema, object, string } from 'yup'

export interface Form {
    username: string,
    password: string
}

const Form = () => {
    const params = useSearchParams()
    const router = useRouter()

    const formSchema: ObjectSchema<Form> = object().shape({
        username: string().required("Nama pengguna wajib diisi!").test({
            name: "Check Exists Username",
            test: async (e: string) => await checkExistUsername(e) > 0,
            message: `Nama pengguna tidak terdaftar!`
        }),
        password: string().required("Kata sandi wajib diisi!").min(8, "Kata sandi harus minimal 8 karakter!").test({
            name: "Check Password",
            test: async (e: string) => await validatePasswordUser(form.values.username, e),
            message: 'Kata sandi salah!'
        })
    })

    const form = useFormik<Form>({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: formSchema,
        onSubmit: async (e) => {
            const onSignIn =  await signIn("credentials", { 
                username: e.username,
                password: e.password,
                redirect: false
             })

             if(onSignIn != undefined && onSignIn.ok){
                router.replace(params.get("callbackUrl") ?? '/')
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
                { isSubmitting ? <div className="loading"></div> : null }
                <span>Masuk</span>
            </button>
        </div>
    </form>
}

export default Form