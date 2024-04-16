"use client"

import { GetSavingAccountsPayLoad } from "@/app/(public)/(main)/akutansi/rekeningnasabah/action"
import { useFormik } from "formik"
import dynamic from "next/dynamic"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { DateValueType } from "react-tailwindcss-datepicker"
import { object, string } from "yup"

const DatePicker = dynamic(() => import("@/app/components/datePicker"))

export interface Form {
    account: string,
    date: DateValueType
}

const Form = ({ savingAccounts }: {
    savingAccounts: Array<GetSavingAccountsPayLoad>,
}) => {
    const router = useRouter()
    const pathName = usePathname()
    const searchParams = useSearchParams()

    const formSchema = object().shape({
        account: string().required('Rekening tidak boleh kosong!'),
    })

    const form = useFormik<Form>({
        initialValues: {
            account: '',
            date: null
        },
        validationSchema: formSchema,
        onSubmit: (e, {setFieldError}) => {
            if(e.date != null && e.date.startDate != null && e.date.endDate != null){
                const params = new URLSearchParams(searchParams)
                params.set("account", e.account)
                params.set("date", `${e.date?.startDate}to${e.date?.endDate}`)
                router.replace(`${pathName}${params.size > 0 ? `?${params}` : ''}`)
            }else{
                setFieldError("date", "Tanggal tidak boleh kosong!")
            }
        }
    })
    const { handleSubmit, handleChange, values, errors, setFieldValue } = form

    return (
        <form className="mt-10" onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-2 gap-5 mt-5">
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Rekening</span>
                    </div>
                    <select className="bg-gray-50 border input input-bordered w-full max-w-xs" name="account" value={values.account} onChange={handleChange}>
                        <option value="" className="text-gray-200">Pilih Rekening</option>
                        {
                            savingAccounts.map(e => <option value={e.id} key={e.id}>{e.name}</option>)
                        }
                    </select>
                    {errors.account ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{errors.account}</span></label> : null}
                </label>
                <label className="form-control w-full max-w-xs">
                    <DatePicker
                        autoGenerateParams={false}
                        onChange={e => setFieldValue("date", e)}
                        value={values.date} />
                    {errors.date ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{errors.date}</span></label> : null}
                </label>
            </div>
            <button className="btn bg-blue-900 my-5 text-white">Simpan</button>
        </form>
    )
}
export default Form