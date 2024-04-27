import { SearchParams } from "@/app/(public)/(main)/produk/kategori/page"
import { getAllProduct, getSumAllProductQty } from "@/app/(public)/(main)/produk/listproduk/action"
import { currencyFormat } from "@/utils/utils"
import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"

const Check = dynamic(() => import('./(table)/check'))
const CheckAll = dynamic(() => import('./(table)/checkAll'))
const DeleteButton = dynamic(() => import('./(table)/deleteButton'))
const Pagination = dynamic(() => import('@/app/components/pagination'))

const Tablelist = async ({ searchParams }: {
    searchParams: SearchParams
}) => {
    const [allProduct, sumAllProductQty] = await Promise.all([getAllProduct(searchParams), getSumAllProductQty()])

    return <>
        <div className="overflow-x-auto bg-white p-10 my-5 text-gray-900">
            <table className="table">
                <thead className=" text-gray-900">
                    <tr>
                        <th><CheckAll data={allProduct.result} /></th>
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
                        allProduct.result.map(e => <tr key={e.id}>
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
                            <td>{e.code}</td>
                            <td>{e.productCategories ? e.productCategories.name : 'N/A'}</td>
                            <td>{ e.qty }</td>
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

        <div className="flex justify-end bg-white rounded-box p-6">
            <span>Jumlah kuantitas dari semua produk : <b>{ sumAllProductQty.length > 0 ? sumAllProductQty.map(e => e.qty).reduce((val, prev) => val + prev) : 0 }</b></span>
        </div>

        <Pagination
            hasNextPage={allProduct.hasNextPage}
            hasPrevPage={allProduct.hasPrevPage}
            page={allProduct.page} />
    </>
}
export default Tablelist