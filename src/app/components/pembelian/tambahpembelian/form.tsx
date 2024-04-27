"use client"

import { addPurchase } from "@/app/(public)/(main)/pembelian/tambahpembelian/action"
import { SavingAccounts, Supplier } from "@/app/(public)/(main)/pembelian/tambahpembelian/page"
import { errorAlert } from "@/utils/alert/swal"
import { $Enums } from "@prisma/client"
import { useFormik } from "formik"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { number, object, string } from "yup"

const SupplierComboBox = dynamic(() => import('@/app/components/comboBoxInput'))

export interface Form {
    document: File | null,
    supplier: string,
    savingAccount: string,
    total: number,
    note: string,
    purchaseStatus: string
}

export interface FormWithoutDocument{
    document?: File | null,
    supplier: string,
    savingAccount: string,
    total: number,
    note: string,
    purchaseStatus: string
}

const Form = ({ supplier, savingAccounts }: {
    supplier: Array<Supplier>,
    savingAccounts: Array<SavingAccounts>
}) => {
    const router = useRouter()
    const formSchema = object().shape({
        supplier: string().required('Supplier tidak boleh kosong!'),
        savingAccount: string().required('Rekening harus diisi!'),
        total: number().required('Total pembayaran tidak boleh kosong!'),
        purchaseStatus: string().required('Status pembelian tidak boleh kosong!')
    })

    const form = useFormik<Form>({
        initialValues: {
            document: null,
            supplier: '',
            savingAccount: '',
            note: '',
            total: 0,
            purchaseStatus: ''
        },
        validationSchema: formSchema,
        onSubmit: async e => {
            try {
                let document = null
                if(e.document){
                    const buffer = Buffer.from(await e.document.arrayBuffer()).toString("base64")
                    document = `data:${e.document.type};base64,${buffer}`
                }

                const formWithoutDocument: FormWithoutDocument = e
                delete formWithoutDocument.document
                await addPurchase(formWithoutDocument, document)
                router.push("/pembelian/listpembelian")
            } catch {
                errorAlert()
            }
        }
    })
    const { errors, values, isSubmitting, handleSubmit, handleChange, setFieldValue } = form
    return (
        <form className="mt-10 relative" onSubmit={handleSubmit}>
            <h1 className="py-2 text-gray-900">Dokumen</h1>
            <input type="file" className="file-input file-input-bordered w-full max-w-xs" onChange={e => setFieldValue("document", e.target.files?.item(0))} />
            <div className="grid lg:grid-cols-2 gap-5 mt-5">
                <div className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Supplier*</span>
                    </div>

                    <SupplierComboBox
                        data={supplier.map(e => ({ id: e.id, name: e.name }))}
                        setSelected={(e: Supplier) => setFieldValue("supplier", e.id)}
                        selected={supplier.find(e => e.id == values.supplier)} />
                    {errors.supplier ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{errors.supplier}</span></label> : null}
                </div>

                <div className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Rekening*</span>
                    </div>

                    <SupplierComboBox
                        data={savingAccounts.map(e => ({ id: e.id, name: e.name }))}
                        setSelected={(e: SavingAccounts) => setFieldValue("savingAccount", e.id)}
                        selected={savingAccounts.find(e => e.id == values.savingAccount)} />

                    {errors.savingAccount ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{errors.savingAccount}</span></label> : null}
                </div>

                <div className="form-control w-full">
                    <label htmlFor="" className="label">
                        <span className="label-text">Total pembayaran*</span>
                    </label>

                    <input type="number" className="input input-bordered" name="total" value={values.total} onChange={handleChange} />
                    { errors.total ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{ errors.total }</span></label> : null }
                </div>

                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Status Pembelian</span>
                    </div>
                    <select className="bg-gray-50 border input input-bordered w-full capitalize" name="purchaseStatus" defaultValue={values.purchaseStatus} onChange={handleChange}>
                        <option value="" disabled>Pilih status pembelian</option>
                        {Object.keys($Enums.PurchaseStatus).map(key => <option value={key} key={key}>{key.split("_").join(" ").toLowerCase()}</option>)}
                    </select>
                    {errors.purchaseStatus ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{errors.purchaseStatus}</span></label> : null}
                </label>

                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Catatan</span>
                    </div>
                    <textarea className="textarea textarea-bordered" placeholder="Catatan" name="note" onChange={handleChange}></textarea>
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