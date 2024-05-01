"use client"

import { GetPurchasePayload, GetPurchaseReturnPayload, updateData } from "@/app/(public)/(main)/pengembalian/pembelian/[purchaseReturn]/edit/action"
import {SavingAccount } from "@/app/(public)/(main)/pengembalian/pembelian/[purchaseReturn]/edit/page"
import { passwordInputAlert } from "@/utils/alert/swal"
import { currencyFormat } from "@/utils/utils"
import { useFormik } from "formik"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import { object, string } from "yup"

const Combobox = dynamic(() => import('@/app/components/comboBoxInput'))

export interface Form {
    purchase: string,
    savingAccounts: string,
    notes: string
}

const Form = ({ savingAccount, purchase, purchaseReturn }: {
    savingAccount: Array<SavingAccount>,
    purchase: Array<GetPurchasePayload>,
    purchaseReturn: GetPurchaseReturnPayload
}) => {
    const router = useRouter()
    const formSchema = object().shape({
        purchase: string().required('Pembelian tidak boleh kosong!'),
        savingAccounts: string().required('Rekening tidak boleh kosong!')
    })

    const form = useFormik<Form>({
        initialValues: {
            purchase: purchaseReturn.idPurchase,
            savingAccounts: purchaseReturn.idSavingAccount ?? '',
            notes: purchaseReturn.notes ?? ''
        },
        validationSchema: formSchema,
        onSubmit: async e => {
            try{
                const confirmPassword = await passwordInputAlert()

                if(confirmPassword){
                    await updateData(purchaseReturn.id, e)
                    router.push('/pengembalian/pembelian')
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
    const { handleChange, handleSubmit, values, errors, isSubmitting, setFieldValue } = form

    return (
        <form className="mt-10" onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-2 gap-5 mt-5">
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Rekening*(Wajib)</span>
                    </div>
                    <Combobox
                        data={savingAccount}
                        selected={savingAccount.find(e => e.id == values.savingAccounts)}
                        setSelected={(e: SavingAccount) => setFieldValue("savingAccounts", e.id)} />
                    {errors.savingAccounts ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{errors.savingAccounts}</span></label> : null}
                </label>

                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Pembelian*(Wajib)</span>
                    </div>
                    <Combobox
                        data={purchase.map(e => ({ id: e.id, name: `${e.id} (${currencyFormat(e.total)})` }))}
                        selected={purchase.map(e => ({ id: e.id, name: `${e.id} (${currencyFormat(e.total)})` })).filter(e => e.id == values.purchase)[0]}
                        setSelected={(e: GetPurchasePayload) => setFieldValue("purchase", e.id)} />
                    {errors.purchase ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{errors.purchase}</span></label> : null}
                </label>

                <label className="form-control w-full col-span-2">
                    <div className="label">
                        <span className="label-text">Catatan</span>
                    </div>
                    <textarea className="textarea textarea-bordered" placeholder="Catatan" name="notes" onChange={handleChange} value={values.notes}></textarea>
                </label>
            </div>

            <button className="btn bg-blue-900 my-5 text-white" disabled={isSubmitting}>
                {isSubmitting ? <div className="loading"></div> : null}
                <span>Simpan</span>
            </button>
        </form>
    )
}
export default Form