"use client"

import { updateData } from "@/app/(public)/(main)/akutansi/transferuang/[moneyTransfer]/edit/action"
import { MoneyTransfer, SavingAccount } from "@/app/(public)/(main)/akutansi/transferuang/[moneyTransfer]/edit/page"
import { passwordInputAlert } from "@/utils/alert/swal"
import { useFormik } from "formik"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import { number, object, string } from "yup"

const Combobox = dynamic(() => import('@/app/components/comboBoxInput'))

export interface Form {
    from: string,
    to: string,
    total: number
}

const Form = ({ savingAccount, moneyTransfer }: {
    savingAccount: Array<SavingAccount>,
    moneyTransfer: MoneyTransfer
}) => {
    const router = useRouter()
    const formSchema = object().shape({
        from: string().required('Rekening tidak boleh kosong!'),
        to: string().required('Rekening tidak boleh kosong!'),
        total: number().required('Jumlah saldo tidak boleh kosong!').min(1, "Saldo tidak boleh 0!")
    })

    const form = useFormik<Form>({
        initialValues: {
            from: moneyTransfer.fromSavingAccount ?? '',
            to: moneyTransfer.toSavingAccount ?? '',
            total: moneyTransfer.total
        },
        validationSchema: formSchema,
        onSubmit: async e => {
            try{
                const confirmPassword = await passwordInputAlert()

                if(confirmPassword){
                    await updateData(moneyTransfer.id, e)
                    router.push("/akutansi/transferuang")
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
    const { handleSubmit, handleChange, values, errors, isSubmitting, setFieldValue } = form

    return (
        <form className="mt-10" onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-2 gap-5 mt-5">
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Dari Rekening*(Wajib)</span>
                    </div>
                    <Combobox
                        data={savingAccount}
                        selected={savingAccount.find(e => e.id == values.from)}
                        setSelected={(e: SavingAccount) => setFieldValue("from", e.id)} />
                    {errors.from ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{errors.from}</span></label> : null}
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Ke Rekening*(Wajib)</span>
                    </div>
                    <Combobox
                        data={savingAccount}
                        selected={savingAccount.find(e => e.id == values.to)}
                        setSelected={(e: SavingAccount) => setFieldValue("to", e.id)} />
                    {errors.to ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{errors.to}</span></label> : null}
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Jumlah*(Wajib)</span>
                    </div>
                    <input type="number" placeholder="Saldo" className="input input-bordered w-full max-w-xs" name="total" value={values.total} onChange={handleChange} />
                    {errors.total ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{errors.total}</span></label> : null}
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