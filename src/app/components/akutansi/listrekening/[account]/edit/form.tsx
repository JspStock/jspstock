"use client"

import { getCountDataByNo, updateData } from "@/app/(public)/(main)/akutansi/listrekening/[account]/edit/action"
import { SavingAccount } from "@/app/(public)/(main)/akutansi/listrekening/[account]/edit/page"
import { passwordInputAlert } from "@/utils/alert/swal"
import { useFormik } from "formik"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import { number, object, string } from "yup"

export interface Form{
    no: string,
    name: string,
    notes: string,
    startingBalance: number
}

const Form = ({ data }: {
    data: SavingAccount
}) => {
    const router = useRouter()
    const formSchema = object().shape({
        no: string().required("Nomor rekening harus diisi!"),
        name: string().required("Nama rekening harus diisi!"),
        startingBalance: number().required("Saldo awal tidak boleh kosong!"),
    })

    const form = useFormik<Form>({
        initialValues: {
            no: data.id,
            name: data.name,
            notes: data.notes ?? '',
            startingBalance: data.startingBalance
        },
        validationSchema: formSchema,
        onSubmit: async e => {
            try{
                const confirmPassword = await passwordInputAlert()

                if(confirmPassword){
                    if(e.no != data.id){
                        const check = await checkExistsNo()
                        if(!check){
                            return false
                        }
                    }
    
                    await updateData(data.id, e)
                    router.push("/akutansi/listrekening")
                }
            }catch{
                Swal.fire({
                    icon: "error",
                    title: 'Terjadi kesalahan!',
                    text: 'Kesalahan pada server, coba kembali beberapa saat!'
                })
            }
        }
    })
    const { values, errors, handleChange, handleSubmit, touched, setFieldError, isSubmitting } = form
    const checkExistsNo = async () => {
        if(await getCountDataByNo(values.no) == 0){
            return true
        }else{
            setFieldError("no", "Nomor rekening sudah terdaftar!")
            return false
        }
    }

    return (
        <form className="mt-10" onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-2 gap-5 mt-5">
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Nomor Rekening*(Wajib)</span>
                    </div>
                    <input type="text" placeholder="Rekening" className="input input-bordered w-full max-w-xs" name="no" value={values.no} onChange={handleChange} />
                    { errors.no && touched.no ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{ errors.no }</span></label> : null }
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Nama*(Wajib)</span>
                    </div>
                    <input type="text" placeholder="Nama" className="input input-bordered w-full max-w-xs" name="name" value={values.name} onChange={handleChange} />
                    { errors.name && touched.name ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{ errors.name }</span></label> : null }
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Saldo Awal</span>
                    </div>
                    <input type="number" placeholder="Saldo" className="input input-bordered w-full max-w-xs" name="startingBalance" value={values.startingBalance} onChange={handleChange} />
                    { errors.startingBalance && touched.startingBalance ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{ errors.startingBalance }</span></label> : null }
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Catatan</span>
                    </div>
                    <textarea className="textarea textarea-bordered" placeholder="Catatan" name="notes" value={values.notes} onChange={handleChange}></textarea>
                </label>
            </div>
            <button className="btn bg-blue-900 my-5 text-white" disabled={isSubmitting}>
                { isSubmitting ? <div className="loading"></div> : null }
                <span>Simpan</span>
            </button>
        </form>
    )
}
export default Form