import { generateSearchParams } from "@/utils/produk/kategori/utils"
import Link from "next/link"

const Perpage = ({ show }: { show?: string }) => {
    return (
        <div className="flex items-center mt-3">
            <div className="dropdown">
                <div tabIndex={0} role="button" className="btn m-1">{ show ? show : 10 }</div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 bg-base-100 rounded-box w-52 shadow-xl">
                    <li><Link href={`/produk/kategori?${generateSearchParams({show: 10})}`} replace>10</Link></li>
                    <li><Link href={`/produk/kategori?${generateSearchParams({show: 50})}`} replace>50</Link></li>
                    <li><Link href={`/produk/kategori?${generateSearchParams({show: 'all'})}`} replace>ALL</Link></li>
                </ul>
            </div>
            <h1>Per halaman</h1>
        </div>
    )
}
export default Perpage