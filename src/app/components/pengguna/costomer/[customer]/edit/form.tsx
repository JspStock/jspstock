"use client"

import { updateData } from "@/app/(public)/(main)/pengguna/costomer/[customer]/edit/action"
import { Customer } from "@/app/(public)/(main)/pengguna/costomer/[customer]/edit/page"
import { CustomerGroup } from "@/app/(public)/(main)/pengguna/costomer/tambah/page"
import { useFormik } from "formik"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import { object, string } from "yup"

export interface Form {
    customerGroup: string,
    name: string,
    noWa: string,
    address: string,
}

const Form = ({ customerGroup, customerData }: {
    customerGroup: Array<CustomerGroup>,
    customerData: Customer
}) => {
    const router = useRouter()
    const formSchema = object().shape({
        customerGroup: string().required("Grub kustomer harus diisi!"),
        name: string().required("Nama harus diisi!"),
        email: string().required("Email harus diisi!").email('Format email tidak benar!'),
        noWa: string().required('Nomor WhatsApp harus diisi!'),
        address: string().required('Alamat harus diisi!'),
        city: string().required('Kota harus diisi!'),
        zipCode: string().required('Kode pos harus diisi!'),
        region: string().required('Wilayah harus diisi!')
    })

    const form = useFormik<Form>({
        initialValues: {
            customerGroup: customerData.idCustomerGroup ?? '',
            name: customerData.name,
            noWa: customerData.noWa,
            address: customerData.address ?? '',
        },
        validationSchema: formSchema,
        onSubmit: async e => {
            try {
                await updateData(customerData.id, e)
                router.push("/pengguna/costomer")
            } catch {
                Swal.fire({
                    icon: 'error',
                    title: 'Terjadi kesalahan!',
                    text: 'Kesalahan saat menambahkan data, coba kembali beberapa saat dan pastikan jaringan terhubung internet.'
                })
            }
        }
    })
    const { handleChange, handleSubmit, values, errors, touched, isSubmitting, setFieldError } = form

    return (
        <form className="mt-10" onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-2 gap-5 mt-5">
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Grup Costomer*(Wajib)</span>
                    </div>
                    <select className="bg-gray-50 border input input-bordered w-full max-w-xs" onChange={handleChange} name="customerGroup" value={values.customerGroup}>
                        <option value="" disabled className="text-gray-200">Pilih Grup CS</option>
                        {customerGroup.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                    </select>
                    {errors.customerGroup && touched.customerGroup ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{errors.customerGroup}</span></label> : null}
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Nama*(Wajib)</span>
                    </div>
                    <input type="text" placeholder="Masukkan nama" className="input input-bordered w-full max-w-xs" name="name" value={values.name} onChange={handleChange} />
                    {errors.name && touched.name ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{errors.name}</span></label> : null}
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">No WhatsApp*(Wajib)</span>
                    </div>
                    <input type="text" placeholder="Masukkan nomor WhatsApp" className="input input-bordered w-full max-w-xs" name="noWa" value={values.noWa} onChange={handleChange} />
                    {errors.noWa && touched.noWa ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{errors.noWa}</span></label> : null}
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Alamat*(Wajib)</span>
                    </div>
                    <textarea className="textarea textarea-bordered" placeholder="Alamat" name="address" value={values.address} onChange={handleChange}></textarea>
                    {errors.address && touched.address ? <label htmlFor="" className="label"><span className="label-text-alt text-error">{errors.address}</span></label> : null}
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