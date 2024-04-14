"use client"

import { updateData } from "@/app/(public)/(main)/pengeluaran/listpengeluaran/[expenditure]/edit/action"
import { Expenditure, ExpenditureCategory, SavingAccounts } from "@/app/(public)/(main)/pengeluaran/listpengeluaran/[expenditure]/edit/page"
import { useFormik } from "formik"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import { number, object, string } from "yup"

export interface FormState {
    expenditureCategory: string | undefined,
    account: string | undefined,
    totalExpenditure: number,
    note: string | undefined
}

const Form = ({ expenditureCategory, savingAccounts, data }: {
    expenditureCategory: Array<ExpenditureCategory>,
    savingAccounts: Array<SavingAccounts>,
    data: Expenditure
}) => {
    const router = useRouter()
    const formSchema = object().shape({
        expenditureCategory: string().required("Kategori pengeluaran tidak boleh kosong!"),
        account: string().required("Nomor rekening tidak boleh kosong!"),
        totalExpenditure: number().required("Jumlah pengeluaran tidak boleh kosong!").min(1, "Total pengeluaran tidak boleh kosong!")
    })

    const form = useFormik<FormState>({
        initialValues: {
            expenditureCategory: data.idExpenditureCategory ?? undefined,
            account: data.idSavingAccount ?? undefined,
            totalExpenditure: data.total,
            note: data.notes ?? undefined
        },
        validationSchema: formSchema,
        onSubmit: async (e, {setFieldError}) => {
            try{
                const balance = savingAccounts.find(val => val.id == e.account)!.startingBalance
                if(e.totalExpenditure <= balance){
                    await updateData(data.id, e)
                    router.push("/pengeluaran/listpengeluaran")
                }else{
                    setFieldError("totalExpenditure", `Jumlah pengeluaran tidak boleh melebihi jumlah tabungan (max: ${balance})`)
                }
            }catch{
                Swal.fire({
                    icon: "error",
                    title: 'Terjadi kesalahan!',
                    text: 'Kesalahan pada server, coba kembali beberapa saat.'
                })
            }
        }
    })
    const { handleSubmit, handleChange, values, errors, touched, isSubmitting } = form

    return (
        <form className="mt-10" onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-2 gap-5 mt-5">
                <div className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Kategori Pengeluaran*(Wajib)</span>
                    </div>
                    <select className="bg-gray-50 border input input-bordered w-full max-w-xs" value={values.expenditureCategory} name="expenditureCategory" onChange={handleChange}>
                        <option className="text-gray-200" value="">Kategori</option>
                        {expenditureCategory.map((e, index) => <option key={index} value={e.id}>{e.name}</option>)}
                    </select>
                    {errors.expenditureCategory && touched.expenditureCategory ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{errors.expenditureCategory}</span></label> : null}
                </div>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Jumlah Pengeluaran*(Wajib)</span>
                    </div>
                    <input type="number" placeholder="Jumlah" className="input input-bordered w-full max-w-xs" name="totalExpenditure" value={values.totalExpenditure} onChange={handleChange} />
                    {errors.totalExpenditure && touched.totalExpenditure ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{errors.totalExpenditure}</span></label> : null}
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Rekening</span>
                    </div>
                    <select className="bg-gray-50 border input input-bordered w-full max-w-xs" name="account" value={values.account} onChange={handleChange}>
                        <option className="text-gray-200" value="">Rekening</option>
                        {savingAccounts.map((e, index) => <option key={index} value={e.id}>{e.id}({e.name})</option>)}
                    </select>
                    {errors.account && touched.account ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{errors.account}</span></label> : null}
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Catatan Penjualan</span>
                    </div>
                    <textarea className="textarea textarea-bordered" placeholder="Catatan" name="note" value={values.note} onChange={handleChange}></textarea>
                </label>
            </div>

            <button type="submit" className="btn bg-blue-900 my-5 text-white" disabled={isSubmitting}>
                {isSubmitting ? <div className="loading"></div> : null}
                <span>Simpan</span>
            </button>
        </form>
    )
}
export default Form