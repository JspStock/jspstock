"use client"

import { ExpenditureCategory, Params } from "@/app/(public)/(main)/pengeluaran/kategoripengeluaran/[expenditures]/edit/page"
import { updateData } from "@/app/(public)/(main)/pengeluaran/kategoripengeluaran/tambah/action"
import { useFormik } from "formik"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import { object, string } from "yup"

export interface Form{
    name: string
}

const Form = ({ params, data }: {
    params: Params,
    data: ExpenditureCategory
}) => {
    const router = useRouter()
    const formSchema = object().shape({
        name: string().required("Nama pengeluaran tidak boleh kosong!")
    })

    const form = useFormik<Form>({
        initialValues: {
            name: data.name
        },
        validationSchema: formSchema,
        onSubmit: async (e) => {
            try{
                await updateData({ id: params.expenditures, name: e.name })
                router.push('/pengeluaran/kategoripengeluaran')
            }catch{
                Swal.fire({
                    icon: 'error',
                    title: 'Terjadi kesalahan!',
                    text: 'Kesalahan pada server, silahkan coba kembali beberapa saat.'
                })
            }
        }
    })
    const { values, handleSubmit, handleChange, touched, isSubmitting, errors } = form


    return (
        <form className="mt-10" onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-2 gap-5 mt-5">
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Nama Pengeluaran*(Wajib)</span>
                    </div>
                    <input type="text" placeholder="Nama" className="input input-bordered w-full max-w-xs" name="name" value={values.name} onChange={handleChange} />
                    { errors.name && touched.name ? <label htmlFor="" className="label"><span className="label-text-error">{ errors.name }</span></label> : null }
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