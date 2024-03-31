import Image from "next/image";
import Logo from '@/assets/images/logo.png'
import dynamic from "next/dynamic";
import Link from "next/link";
import { getAllCategories } from "@/app/(public)/(main)/produk/kategori/action";
import { SearchParams } from "@/app/(public)/(main)/produk/kategori/page";

export interface Category {
    id: string;
    idStore: string;
    idProductCategories: string | null;
    imagePath: string;
    name: string;
    createdAt: Date
    parent?: {
        name: string
    }
}

const CheckAll = dynamic(() => import('./(table)/checkAll'))
const Check = dynamic(() => import('./(table)/check'))
const DeleteButton = dynamic(() => import('./deleteButton'))

const TableKategori = async ({ searchParams }: { 
    searchParams: SearchParams
 }) => {
    const allCategories = await getAllCategories(searchParams.show, searchParams.search, searchParams.page)

    return (
        <div className="overflow-x-auto bg-white p-10 my-5 text-gray-900">
            <table className="table">
                <thead className=" text-gray-900">
                    <tr>
                        <th>
                            <CheckAll data={allCategories} />
                        </th>
                        <th>Foto</th>
                        <th>Kategori</th>
                        <th>Parent</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allCategories.map(e => <tr key={e.id}>
                            <td>
                                <Check data={e} />
                            </td>
                            <td>
                                <div className="avatar">
                                    <div className="w-20 rounded relative">
                                        <Image
                                            width={0}
                                            height={0}
                                            src={e.imagePath.trim() == '' ? Logo : e.imagePath}
                                            alt={e.name}
                                            quality={100}
                                            sizes="100vw"
                                            className="w-full h-auto" />
                                    </div>
                                </div>
                            </td>
                            <td>{e.name}</td>
                            <td>{e.parent ? e.parent.name : 'N/A'}</td>
                            <td>
                                <div className="dropdown dropdown-right">
                                    <div tabIndex={0} role="button" className="btn btn-ghost m-1">Lainnya</div>
                                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-xl bg-base-100 rounded-box w-52">
                                        <li><Link href={`/produk/kategori/${e.id}/edit`}>Edit</Link></li>
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
export default TableKategori