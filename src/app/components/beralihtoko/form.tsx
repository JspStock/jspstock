"use client"

import { switchStore } from "@/app/(public)/(main)/beralihtoko/action";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { object, string } from "yup";

export interface Form {
    store: string | undefined
}

const Form = ({ currentStore, data }: {
    currentStore: string,
    data: Array<{
        id: string;
        name: string;
    }>
}) => {
    const router = useRouter()
    const formSchema = object().shape({
        store: string().required('Harus memilih salah satu toko!')
    })

    const form = useFormik<Form>({
        initialValues: {
            store: undefined
        },
        validationSchema: formSchema,
        onSubmit: async e => {
            try{
                await switchStore(e)
                router.push('/dashboard')
            }catch{
                Swal.fire({
                    icon: 'error',
                    title: 'Terjadi kesalahan!',
                    text: 'Kesalahan pada server, silahkan coba kembali beberapa saat.'
                })
            }
        }
    })

    const { values, handleChange, handleSubmit, isSubmitting, errors } = form
    return (
        <form className="mt-10" onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-2 gap-5 mt-5">
                <div className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Pilih Toko yang kamu inginkan</span>
                    </div>
                    <select id="countries" className="bg-gray-50 border input input-bordered w-full max-w-xs" name="store" value={values.store} onChange={handleChange}>
                        {
                            data.map(e => <option key={e.id} value={e.id} selected={e.id == currentStore}>{e.name}</option>)
                        }
                    </select>
                    {
                        errors.store ? <label htmlFor="" className="label">
                            <span className="label-text-alt text-error">{ errors.store }</span>
                        </label> : null
                    }
                </div>
            </div>

            <button type="submit" className="btn bg-blue-900 my-5 text-white" disabled={isSubmitting}>
                {isSubmitting ? <div className="loading"></div> : null}
                <span>Beralih Toko</span>
            </button>
        </form>
    )
}
export default Form