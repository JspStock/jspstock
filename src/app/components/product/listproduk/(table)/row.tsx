"use client"

import { GetProductPayload } from "@/app/(public)/(main)/produk/listproduk/action"
import { currencyFormat } from "@/utils/utils"
import dynamic from "next/dynamic"

const Check = dynamic(() => import('./check'))
const DeleteButton = dynamic(() => import('./deleteButton'))
const PrintBarcode = dynamic(() => import('./printBarcode'))
const CheckAll = dynamic(() => import('./checkAll'))

import Image from "next/image"
import Link from "next/link"
import { createRef, useRef, useState } from "react"
import { useReactToPrint } from "react-to-print"

const Row = ({ data, }: {
    data: Array<GetProductPayload>
}) => {
    const modalRef = createRef<HTMLDialogElement>()
    const refPrint = useRef(null)
    const [productDetail, setProductDetail] = useState<string | null>(null)
    const handlePrint = useReactToPrint({
        documentTitle: data.find(e => e.id == productDetail)?.name,
        content: () => refPrint.current
    })
    const handleClickRow = (id: string) => {
        const checkData = data.find(e => e.id == id)

        if (checkData) {
            setProductDetail(id)
            modalRef.current?.showModal()
        }
    }

    return <>
        <table className="table">
            <thead className=" text-gray-900">
                <tr>
                    <th><CheckAll data={data} /></th>
                    <th>Foto</th>
                    <th>Nama</th>
                    <th>Kode</th>
                    <th>Kategori</th>
                    <th>Supplier</th>
                    <th>Quantity</th>
                    <th>Harga</th>
                    <th>Biaya</th>
                    <th>Nilai Pasti(Harga - Biaya)</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map(e => <tr key={e.id} className="cursor-pointer hover:bg-gray-100">
                        <td><Check data={e} /></td>
                        <td onClick={() => handleClickRow(e.id)}>
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
                        <td onClick={() => handleClickRow(e.id)}>{e.name}</td>
                        <td onClick={() => handleClickRow(e.id)}>{e.code}</td>
                        <td onClick={() => handleClickRow(e.id)}>{e.productCategories ? e.productCategories.name : 'N/A'}</td>
                        <td onClick={() => handleClickRow(e.id)}>{e.supplier ? e.supplier.name : 'N/A'}</td>
                        <td onClick={() => handleClickRow(e.id)}>{e.qty}</td>
                        <td onClick={() => handleClickRow(e.id)}>{currencyFormat(e.price)}</td>
                        <td onClick={() => handleClickRow(e.id)}>{currencyFormat(e.cost)}</td>
                        <td onClick={() => handleClickRow(e.id)}>{currencyFormat(e.price - e.cost)}</td>
                        <td>
                            <div className="dropdown dropdown-left z-20">
                                <div tabIndex={0} role="button" className="btn btn-ghost">Lainnya</div>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <li><Link href={`/produk/${e.id}/edit`}>Ubah</Link></li>
                                    <li><PrintBarcode data={e} /></li>
                                    <li><DeleteButton id={e.id} /></li>
                                </ul>
                            </div>
                        </td>
                    </tr>)
                }
            </tbody>
        </table>

        <dialog className="modal modal-scroll" ref={modalRef}>
            <div className="modal-box !max-w-[95%] w-full md:!max-w-[80%] lg:!max-w-[40%">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>

                <div className="flex gap-x-2">
                    <h3 className="font-bold text-lg mb-5">Detail Produk</h3>
                    <button onClick={handlePrint} className="btn btn-ghost btn-circle btn-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6">
                            <path fillRule="evenodd" d="M7.875 1.5C6.839 1.5 6 2.34 6 3.375v2.99c-.426.053-.851.11-1.274.174-1.454.218-2.476 1.483-2.476 2.917v6.294a3 3 0 0 0 3 3h.27l-.155 1.705A1.875 1.875 0 0 0 7.232 22.5h9.536a1.875 1.875 0 0 0 1.867-2.045l-.155-1.705h.27a3 3 0 0 0 3-3V9.456c0-1.434-1.022-2.7-2.476-2.917A48.716 48.716 0 0 0 18 6.366V3.375c0-1.036-.84-1.875-1.875-1.875h-8.25ZM16.5 6.205v-2.83A.375.375 0 0 0 16.125 3h-8.25a.375.375 0 0 0-.375.375v2.83a49.353 49.353 0 0 1 9 0Zm-.217 8.265c.178.018.317.16.333.337l.526 5.784a.375.375 0 0 1-.374.409H7.232a.375.375 0 0 1-.374-.409l.526-5.784a.373.373 0 0 1 .333-.337 41.741 41.741 0 0 1 8.566 0Zm.967-3.97a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H18a.75.75 0 0 1-.75-.75V10.5ZM15 9.75a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V10.5a.75.75 0 0 0-.75-.75H15Z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>

                {
                    data.find(e => e.id == productDetail) ? <div className="flex gap-x-6 flex-col lg:flex-row">
                        <div className="w-full lg:w-6/12">
                            <Image
                                src={data.find(e => e.id == productDetail)!.imagePath}
                                width={0}
                                height={0}
                                sizes="100vw"
                                className="w-full rounded-box h-auto max-h-96 object-fill"
                                quality={100}
                                alt={data.find(e => e.id == productDetail)!.name} />
                        </div>

                        <div className="w-full lg:w-6/12 space-y-4 text-lg">
                            <p><b>Nama Produk:</b> {data.find(e => e.id == productDetail)!.name}</p>
                            <p><b>Kode Produk:</b> {data.find(e => e.id == productDetail)!.code}</p>
                            <p><b>Supplier:</b> {data.find(e => e.id == productDetail)!.supplier?.name}</p>
                            <p><b>Kategori:</b> {data.find(e => e.id == productDetail)!.productCategories?.name}</p>
                            <p><b>Kuantitas:</b> {data.find(e => e.id == productDetail)!.qty}</p>
                            <p><b>Biaya:</b> {data.find(e => e.id == productDetail)!.cost}</p>
                            <p><b>Harga:</b> {data.find(e => e.id == productDetail)!.price}</p>
                        </div>
                    </div> : null
                }
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>

        <div className="hidden">
            {
                data.find(e => e.id == productDetail) ? <div className="flex flex-col gap-6 border border-black m-10 p-6 rounded-box" ref={refPrint}>
                    <div className="w-full">
                        <Image
                            src={data.find(e => e.id == productDetail)!.imagePath}
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="w-full rounded-box h-auto max-h-96 object-fill"
                            quality={100}
                            alt={data.find(e => e.id == productDetail)!.name} />
                    </div>

                    <div className="w-6/12 space-y-4 text-lg">
                        <p><b>Nama Produk:</b> {data.find(e => e.id == productDetail)!.name}</p>
                        <p><b>Kode Produk:</b> {data.find(e => e.id == productDetail)!.code}</p>
                        <p><b>Supplier:</b> {data.find(e => e.id == productDetail)!.supplier?.name}</p>
                        <p><b>Kategori:</b> {data.find(e => e.id == productDetail)!.productCategories?.name}</p>
                        <p><b>Kuantitas:</b> {data.find(e => e.id == productDetail)!.qty}</p>
                        <p><b>Biaya:</b> {data.find(e => e.id == productDetail)!.cost}</p>
                        <p><b>Harga:</b> {data.find(e => e.id == productDetail)!.price}</p>
                    </div>
                </div> : null
            }
        </div>
    </>
}

export default Row