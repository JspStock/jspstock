import { headers } from "next/headers"
import Link from "next/link"

const Perpage = async ({ show }: { show?: string }) => {
    const generateSearchParams = (value: number | string) => {
        const url = new URL(headers().get("x-url")!)
        const searchParams = new URLSearchParams(url.searchParams)
        searchParams.set("show", value.toString())
    
        return searchParams.toString()
    }

    return (
        <div className="flex items-center mt-3">
            <div className="dropdown">
                <div tabIndex={0} role="button" className="btn m-1">{ show ? show : 10 }</div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 bg-base-100 rounded-box w-52 shadow-xl">
                    <li><Link href={`/produk/kategori?${generateSearchParams(10)}`} replace>10</Link></li>
                    <li><Link href={`/produk/kategori?${generateSearchParams(50)}`} replace>50</Link></li>
                    <li><Link href={`/produk/kategori?${generateSearchParams("all")}`} replace>ALL</Link></li>
                </ul>
            </div>
            <h1>Per halaman</h1>
        </div>
    )
}
export default Perpage