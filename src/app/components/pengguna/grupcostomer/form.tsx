"use client"

import { useFormik } from "formik"
import { object, string } from "yup"

export interface Form{
    name: string
}

const Form = () => {
    const formSchema = object().shape({
        name: string().required('Nama tidak boleh kosong!')
    })

    const form = useFormik<Form>({
        initialValues: {
            name: ''
        },
        validationSchema: formSchema,
        onSubmit: async e => {

        }
    })

    const { handleChange, handleSubmit, values, errors, touched, isSubmitting } = form
    return (
        <form className="mt-10" onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-2 gap-5 mt-5">
                <div className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Nama Grup Costomer*(Wajib)</span>
                    </div>
                    <input type="text" placeholder="Contoh : Instagram" className="input input-bordered w-full max-w-xs" name="name" value={values.name}onChange={handleChange} />
                    { errors.name && touched.name ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{ errors.name }</span></label> : null }
                </div>
            </div>
            <button type="submit" className="btn bg-blue-900 my-5 text-white" disabled={isSubmitting}>
                { isSubmitting ? <div className="loading"></div> : null }
                <span>Simpan</span>
            </button>
        </form>
    )
}
export default Form