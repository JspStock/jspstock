"use client"

import { $Enums } from "@prisma/client"
import { useFormik } from "formik"
import { object, string } from "yup"
import { GetUserDataPayload, checkEmail, checkNoWa, checkUsername, updateUser } from "@/app/(public)/(main)/pengguna/[user]/edit/action"
import Swal from 'sweetalert2'
import { useRouter } from "next/navigation"

export interface Form{
    name: string,
    username: string,
    email: string,
    noWa: string,
    role: $Enums.Role
}

const Form = ({ user }: {
    user: GetUserDataPayload
}) => {
    const router = useRouter()
    const formSchema = object().shape({
        name: string().required('Nama tidak boleh kosong!'),
        username: string().required('Nama pengguna tidak boleh kosong!').matches(/^(\S+$)/, 'Nama pengguna tidak boleh memiliki spasi!'),
        email: string().required('Email tidak boleh kosong!').email('Format email salah'),
        noWa: string().required('Nomor WhatsApp tidak boleh kosong!'),
    })

    const validateForm = async () => {
        const username = await checkUsername(form.values.username)
        const email = await checkEmail(form.values.email)
        const noWa = await checkNoWa(form.values.noWa)
        console.log(username)

        username > 0 ? form.setFieldError('username', 'Nama pengguna sudah tersedia!') : null
        email > 0 ? form.setFieldValue('email', 'Email sudah tersedia!') : null
        noWa > 0 ? form.setFieldValue('noWa', 'Nomor WhatsApp sudah tersedia!') : null
    }

    const form = useFormik<Form>({
        initialValues: {
            name: user.name,
            username: user.username,
            email: user.email,
            noWa: user.noWa,
            role: user.role
        },
        validationSchema: formSchema,
        onSubmit: async (e) => {
            await validateForm()
            try{
                await updateUser(
                    user.id,
                    e.name,
                    e.username,
                    e.email,
                    e.noWa,
                    e.role
                )

                form.resetForm()
                router.back()
            }catch{
                Swal.fire({
                    title: 'Kesalahan!',
                    text: 'Kesalahan saat menambahkan data pengguna!, coba kembali beberapa saat!',
                    icon: 'error',
                    confirmButtonText: 'OK!'
                })
            }
        }
    })

    const { values, errors, touched, handleChange, handleSubmit, isSubmitting } = form

    return (
        <form className="mt-10" onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-2 gap-5 mt-5">
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Nama*(Wajib)</span>
                    </div>
                    <input type="text" placeholder="Nama" className="input input-bordered w-full max-w-xs" name="name" value={values.name} onChange={handleChange} />
                    { errors.name && touched.name ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{ errors.name }</span></label> : null }
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Nama Pengguna*(Wajib)</span>
                    </div>
                    <input type="text" placeholder="Nama pengguna" className="input input-bordered w-full max-w-xs" name="username" value={values.username} onChange={handleChange} />
                    { errors.username && touched.username ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{ errors.username }</span></label> : null }
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Email*(Wajib)</span>
                    </div>
                    <input type="text" placeholder="email@email.com" className="input input-bordered w-full max-w-xs" name="email" value={values.email} onChange={handleChange} />
                    { errors.email && touched.email ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{ errors.email }</span></label> : null }
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">No WhatsApp*(Wajib)</span>
                    </div>
                    <input type="text" placeholder="" className="input input-bordered w-full max-w-xs" name="noWa" value={values.noWa} onChange={handleChange} />
                    { errors.noWa && touched.noWa ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{ errors.noWa }</span></label> : null }
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Role*(Wajib)</span>
                    </div>
                    <select id="countries" className="bg-gray-50 border input input-bordered w-full max-w-xs" value={values.role} name="role" onChange={handleChange}>
                        {
                            Object.keys($Enums.Role).map(e => <option value={e} key={e}>{ e }</option>)
                        }
                    </select>
                    { errors.role && touched.role ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{ errors.role }</span></label> : null }
                </label>
            </div>
            <button type="submit" className="btn bg-blue-900 my-5 text-white" disabled={isSubmitting}>
                { isSubmitting ? <div className="loading"></div> : null }
                <span>Simpan</span>
            </button>
        </form>
    )
}
export default Form