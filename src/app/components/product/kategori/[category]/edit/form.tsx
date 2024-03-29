"use client"

import { updateData } from "@/app/(public)/(main)/produk/kategori/[category]/edit/action"
import { useFormik } from "formik"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { mixed, object, string } from "yup"

export interface FormState {
    file: File | null | string,
    name: string,
    parent: string
}

export interface Category {
    name: string;
    id: string;
    idProductCategories?: string | null;
}

export interface Data {
    name: string;
    idProductCategories: string | null;
    id: string;
    imagePath: string;
}

const Form = ({ parentCategory, data }: {
    data: Data
    parentCategory: Array<Category>
}) => {
    const validImageExtension = ['jpg', 'png', 'jpeg']
    const [category, setCategory] = useState<Array<Category>>([])
    const router = useRouter()

    const formSchema = object().shape({
        file: mixed().required("Berkas tidak boleh kosong!")
            .test({
                name: "isValidType",
                message: "Format gambar tidak didukung!",
                test: (e) => {
                    if (typeof e != 'string') {
                        const data = e as File
                        if (validImageExtension.includes(data.type.split('/')[1])) {
                            return true
                        } else {
                            return false
                        }
                    }

                    return true
                }
            }),
        name: string().required("Nama kategori tidak boleh kosong!"),
    })

    const form = useFormik<FormState>({
        initialValues: {
            file: data.imagePath ?? null,
            name: data.name,
            parent: data.idProductCategories ?? ""
        },
        validationSchema: formSchema,
        onSubmit: async (val) => {
            const formData = new FormData()
            formData.append('id', data.id)
            if(val.file){
                formData.append("file", val.file)
            }

            formData.append("name", val.name)
            if (val.parent.trim() != '') {
                formData.append('parent', val.parent)
            }

            try {
                router.back()
                await updateData(formData)
            } catch {
                alert("Kesalahan pada server!")
            }
        }
    })

    useEffect(() => {
        const findParent = (id: string): string => {
            let parent = parentCategory.find(item => item.id === id)
            if (parent && parent.idProductCategories) {
                return `${findParent(parent.idProductCategories)}/${parent.name}`
            } else if (parent) {
                return parent.name
            } else {
                return ''
            }
        }

        const result = parentCategory.map(item => ({ id: item.id, name: findParent(item.id) }))
        setCategory(result)
    }, [parentCategory])

    const { handleSubmit, handleChange, values, touched, isSubmitting, errors, setFieldValue } = form
    return (
        <form className="mt-10" onSubmit={handleSubmit}>
            <div className="form-control">
                <label htmlFor="" className="label">
                    <span className="label-text">Foto</span>
                </label>
                <input type="file" className="file-input file-input-bordered w-full max-w-xs" name="file" onChange={e => setFieldValue("file", e.target.files?.item(0))} />
                {errors.file && touched.file ? <label htmlFor="" className="label">
                    <span className="label-text-alt text-error">{errors.file}</span>
                </label> : null}
            </div>
            <div className="grid lg:grid-cols-2 gap-5 mt-5">
                <div className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Nama Kategori*(Wajib)</span>
                    </div>
                    <input type="text" placeholder="Nama Kategori" className="input input-bordered w-full max-w-xs" name="name" value={values.name} onChange={handleChange} />
                    {errors.name && touched.name ? <label htmlFor="" className="label">
                        <span className="label-text-alt text-error">{errors.name}</span>
                    </label> : null}
                </div>

                <div className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Parent Kategori</span>
                    </div>

                    <select id="category" className="bg-gray-50 border input input-bordered w-full max-w-xs" name="parent" value={values.parent} onChange={handleChange}>
                        <option value=''>Pilih</option>
                        {category.map(e => <option value={e.id} key={e.id}>{e.name}</option>)}
                    </select>
                </div>
            </div>

            <button type="submit" className="btn bg-blue-900 my-5 text-white" disabled={isSubmitting}>
                {isSubmitting ? <div className="loading"></div> : null}
                <span>Simpan</span>
            </button>
        </form>
    )
}
export default Form