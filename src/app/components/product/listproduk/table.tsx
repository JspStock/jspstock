import { SearchParams } from "@/app/(public)/(main)/produk/kategori/page"
import { getAllProduct } from "@/app/(public)/(main)/produk/listproduk/action"
import { currencyFormat } from "@/utils/utils"
import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"

const Check = dynamic(() => import('./(table)/check'))
const CheckAll = dynamic(() => import('./(table)/checkAll'))
const DeleteButton = dynamic(() => import('./(table)/deleteButton'))

export interface AllProduct {
    name: string;
    id: string;
    imagePath: string;
    qty: number;
    price: number;
    cost: number;
    productCategories: {
        name: string
    } | null;
}

const Tablelist = async ({ searchParams }: {
    searchParams: SearchParams
}) => {
    const allProduct: Array<AllProduct> = await getAllProduct({
        search: searchParams.search,
        show: searchParams.show,
        page: searchParams.page ? parseInt(searchParams.page) : undefined
    })

    return (
        <div className="overflow-x-auto bg-white p-10 my-5 text-gray-900">
            <table className="table">
                <thead className=" text-gray-900">
                    <tr>
                        <th><CheckAll data={allProduct} /></th>
                        <th>Foto</th>
                        <th>Nama</th>
                        <th>Kode</th>
                        <th>Kategori</th>
                        <th>Quantity</th>
                        <th>Harga</th>
                        <th>Biaya</th>
                        <th>Nilai Pasti(Harga - Biaya)</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allProduct.map(e => <tr key={e.id}>
                            <td><Check data={e} /></td>
                            <td>
                                <div className="avatar">
                                    <div className="w-20 rounded">
                                        <Image
                                            src={e.imagePath}
                                            width={0}
                                            height={0}
                                            sizes="100vw"
                                            className="w-full h-auto"
                                            quality={100}
                                            alt={e.name} />
                                    </div>
                                </div>
                            </td>
                            <td>{e.name}</td>
                            <td>{`${e.id.split("_")[1]}`}</td>
                            <td>{e.productCategories ? e.productCategories.name : 'N/A'}</td>
                            <td>{e.qty}</td>
                            <td>{currencyFormat(e.price)}</td>
                            <td>{currencyFormat(e.cost)}</td>
                            <td>{currencyFormat(e.price - e.cost)}</td>
                            <td>
                                <div className="dropdown dropdown-left">
                                    <div tabIndex={0} role="button" className="btn btn-ghost">Lainnya</div>
                                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                        <li><Link href={`/produk/${e.id}/edit`}>Ubah</Link></li>
                                        <li><DeleteButton id={e.id} /></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}
export default Tablelist