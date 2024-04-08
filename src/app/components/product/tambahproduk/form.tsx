"use client"

import { addProduct, checkProductCode } from "@/app/(public)/(main)/produk/tambahproduk/action";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { mixed, object, string } from "yup";

export interface ProductCategories {
    id: string;
    idProductCategories?: string | null;
    name: string;
}

export interface Form {
    image: File | null,
    name: string,
    code: string,
    category: string,
    price: string,
    cost: string
}

const Form = ({
    productCategories
}: {
    productCategories: Array<ProductCategories>
}) => {
    const router = useRouter()
    const validImageExtension = ['jpg', 'png', 'jpeg']
    const [category, setCategory] = useState<Array<ProductCategories>>([])
    const formSchema = object().shape({
        image: mixed().required('Foto produk harus diisi!')
            .test({
                name: 'isValidType',
                message: 'Format gambar tidak benar!',
                test: e => {
                    const file = e as File
                    return validImageExtension.includes(file.type.split('/')[1])
                }
            }),
        name: string().required('Nama produk tidak boleh kosong!'),
        code: string().required('Kode produk tidak boleh kosong!'),
        category: string().required('Kategori tidak boleh kosong!'),
        price: string().required('Harga produk tidak boleh kosong!'),
        cost: string().required('Biaya produk tidak boleh kosong!')
    })

    const form = useFormik<Form>({
        initialValues: {
            image: null,
            name: '',
            code: '',
            category: '',
            price: '',
            cost: ''
        },
        validationSchema: formSchema,
        onSubmit: async e => {
            try{
                if(await checkProductCode(e.code) == 0){
                    const formData = new FormData()
                    if(e.image != null){
                        formData.append("image", e.image)
                        formData.append("id", e.code)
                        formData.append("name", e.name)
                        formData.append("category", e.category)
                        formData.append("price", e.price)
                        formData.append("cost", e.cost)
    
                        await addProduct(formData)
                        router.replace("listproduk")
                    }
                }else{
                    form.setFieldError("code", "Kode produk sudah tersedia!")
                }
            }catch{
                Swal.fire({
                    icon: 'error',
                    title: 'Terjadi kesalahan!',
                    text: 'Kesalahan saat menambahkan produk, coba kembali beberapa saat dan pastikan koneksi jaringan stabil',
                })
            }
        }
    })

    useEffect(() => {
        const findParent = (id: string): string => {
            let parent = productCategories.find(item => item.id === id)
            if (parent && parent.idProductCategories) {
                return `${findParent(parent.idProductCategories)}/${parent.name}`
            } else if (parent) {
                return parent.name
            } else {
                return ''
            }
        }

        const result = productCategories.map(item => ({ id: item.id, name: findParent(item.id) }))
        setCategory(result)
    }, [productCategories])

    const { values, errors, touched, handleChange, handleSubmit, setFieldValue, isSubmitting } = form
    return (
        <form className="mt-10" onSubmit={handleSubmit}>
            <h1 className="py-2">Foto Produk*</h1>
            <input type="file" className="file-input file-input-bordered w-full" name="image" onChange={e => setFieldValue("image", e.target.files?.item(0)) } />
            {errors.image && touched.image ? <label htmlFor="" className="label">
                <span className="label-text-alt text-error">{errors.image}</span>
            </label> : null}

            <div className="grid lg:grid-cols-2 gap-5 mt-5">
                <div className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Nama Produk*(Wajib)</span>
                    </div>
                    <input type="text" placeholder="Nama Produk" className="input input-bordered w-full" name="name" value={values.name} onChange={handleChange} />
                    {errors.name && touched.name ? <label htmlFor="" className="label">
                        <span className="label-text-alt text-error">{errors.name}</span>
                    </label> : null}
                </div>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Kode Produk*(Wajib)</span>
                    </div>
                    <input type="text" placeholder="Kode Produk" className="input input-bordered w-full" name="code" value={values.code} onChange={handleChange} />
                    {errors.code && touched.code ? <label htmlFor="" className="label">
                        <span className="label-text-alt text-error">{errors.code}</span>
                    </label> : null}
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Kategori Produk*(Wajib)</span>
                    </div>
                    <select id="countries" className="bg-gray-50 border input input-bordered w-full" name="category" value={values.category} onChange={handleChange}>
                        <option defaultValue="" defaultChecked>Pilih kategori produk</option>
                        {
                            category.map(e => <option key={e.id} value={e.id}>{e.name}</option>)
                        }
                    </select>
                    {errors.category && touched.category ? <label htmlFor="" className="label">
                        <span className="label-text-alt text-error">{errors.category}</span>
                    </label> : null}
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Harga*(Wajib)</span>
                    </div>
                    <input type="number" placeholder="Harga" className="input input-bordered w-full" name="price" onChange={handleChange} value={values.price} />
                    {errors.price && touched.price ? <label htmlFor="" className="label">
                        <span className="label-text-alt text-error">{errors.price}</span>
                    </label> : null}
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Biaya*(Wajib)</span>
                    </div>
                    <input type="number" placeholder="Biaya" className="input input-bordered w-full" name="cost" onChange={handleChange} value={values.cost} />
                    {errors.cost && touched.cost ? <label htmlFor="" className="label">
                        <span className="label-text-alt text-error">{errors.cost}</span>
                    </label> : null}
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