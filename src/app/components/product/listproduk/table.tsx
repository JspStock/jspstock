import { AllProduct } from "@/app/(public)/(main)/produk/listproduk/page"
import { currencyFormat } from "@/utils/utils"
import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"

const Check = dynamic(() => import('./(table)/check'))
const CheckAll = dynamic(() => import('./(table)/checkAll'))
const DeleteButton = dynamic(() => import('./(table)/deleteButton'))

const Tablelist = ({ data }: {
    data: Array<AllProduct>
}) => {
    return (
        <div className="overflow-x-auto bg-white p-10 my-5 text-gray-900">
            <table className="table">
                <thead className=" text-gray-900">
                    <tr>
                        <th><CheckAll data={data} /></th>
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
                        data.map(e => <tr key={e.id}>
                            <td><Check id={e.id} /></td>
                            <td>
                                <div className="avatar">
                                    <div className="w-20 rounded">
                                        <Image
                                            src={e.imagePath}
                                            fill
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