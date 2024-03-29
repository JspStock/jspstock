import { headers } from "next/headers"
import Link from "next/link"

const Pagination = ({ page, count, show }: { page?: number, count: number, show?: number }) => {

    const isFirst = ( page ?? 1 ) == 1 || page == 0
    const isLast = ( page ?? 1 ) > (Math.ceil(count / (show ? show : 10)) - 1)

    const generateSearchParams = (val: string) => {
        const header = headers()
        const url = new URL(header.get('x-url')!)
        const searchParams = new URLSearchParams(url.searchParams)
        searchParams.set('page', val)
        return searchParams
    }

    return (
        <div className="join mt-3">
            <Link href={!isFirst ? `/produk/kategori?${generateSearchParams(((page ?? 1) - 1).toString())}` : '#'} replace  className={`join-item btn bg-blue-900 text-white ${isFirst ? 'bg-gray-400' : ''}`} role="button">«</Link>
            <button className="join-item btn text-gray-900">Halaman { page }</button>
            <Link href={!isLast ? `/produk/kategori?${generateSearchParams(((page ?? 1) + 1).toString())}` : '#'} replace  className={`join-item btn bg-blue-900 text-white ${isLast ? 'bg-gray-400' : ''}`} role="button">»</Link>
        </div>
    )
}
export default Pagination