import { getPackaging } from "@/app/(public)/(main)/pemaketan/listpemaketan/action"
import { SearchParams } from "@/app/(public)/(main)/pemaketan/listpemaketan/page"
import { $Enums } from "@prisma/client"
import moment from "moment"
import dynamic from "next/dynamic"
import Link from "next/link"
import QRCode from 'react-qr-code'

export interface Packaging {
    customerUser: {
        name: string;
    } | null;
    createdAt: Date;
    id: string;
    address: string;
    status: $Enums.PackagingStatus;
}

const Pagination = dynamic(() => import('@/app/components/pagination'))
const CheckAll = dynamic(() => import('@/app/components/pemaketan/listpemaketan/(table)/checkAll'))
const Check = dynamic(() => import('@/app/components/pemaketan/listpemaketan/(table)/check'))
const DeleteButton = dynamic(() => import('@/app/components/pemaketan/listpemaketan/(table)/deleteButton'))

const Tablelist = async ({ searchParams }: {
    searchParams: SearchParams
}) => {
    const packaging = await getPackaging(searchParams)

    return <>
        <div className="overflow-x-auto bg-white p-10 my-5 text-gray-900">
            <table className="table">
                <thead className=" text-gray-900">
                    <tr>
                        <th><CheckAll data={packaging.result} /></th>
                        <th>Barcode</th>
                        <th>Tanggal</th>
                        <th>Referensi</th>
                        <th>Costomer</th>
                        <th>Status Pemaketan</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        packaging.result.map((e, index) => <tr key={index}>
                            <td><Check data={e} /></td>
                            <td>
                                <QRCode
                                    value={`${process.env.BASE_URL}/package/${e.id}`}
                                    size={50} />
                            </td>
                            <td>{moment(e.createdAt).format("DD-MM-YYYY")}</td>
                            <td>{e.id}</td>
                            <td>{e.customerUser?.name}</td>
                            <td>
                                <div className={`${e.status == $Enums.PackagingStatus.MENUNGGU_KURIR ? 'bg-blue-400' : 'bg-green-400'} text-center text-xs max-w-fit p-1 rounded-lg font-semibold text-white`}>
                                    {e.status.split("_").join(" ")}
                                </div>
                            </td>
                            <td>
                                <div className="dropdown dropdown-left">
                                    <div tabIndex={0} role="button" className="btn btn-ghost">Lainnya</div>
                                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box">
                                        <li><Link href={`/pemaketan/${e.id}/edit`}>Edit</Link></li>
                                        <li><DeleteButton id={e.id} /></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>

        <Pagination
            hasNextPage={packaging.hasNextPage}
            hasPrevPage={packaging.hasPrevPage}
            page={packaging.page} />
    </>
}
export default Tablelist