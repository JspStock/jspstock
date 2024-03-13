"use client"
import { useRouter } from "next/navigation"

const DrawerSide = () => {
    const router = useRouter()
    return (
        <div className="drawer-side z-20">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu p-4 w-72 min-h-full bg-blue-950 max-md:overflow-scroll text-white">
                {/* Sidebar content here */}
                <li>
                    <label
                        htmlFor="my-drawer"
                        aria-label="close sidebar"
                        onClick={() => router.push("/")}
                        className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">
                        Dashboard
                    </label>
                </li>
                <li>
                    <details className="dropdown">
                        <summary className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">Produk</summary>
                        <ul className="p-2 menu dropdown-content z-[1] bg-blue-950 w-52">
                            <li>
                                <label
                                    htmlFor="my-drawer"
                                    aria-label="close sidebar"
                                    onClick={() => router.push("/produk/kategori")}
                                    className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">
                                    Kategori
                                </label>
                            </li>
                            <li>
                                <label
                                    htmlFor="my-drawer"
                                    aria-label="close sidebar"
                                    onClick={() => router.push("/produk/listproduk")}
                                    className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">
                                    List Produk
                                </label>
                            </li>
                            <li>
                                <label
                                    htmlFor="my-drawer"
                                    aria-label="close sidebar"
                                    onClick={() => router.push("/produk/tambahproduk")}
                                    className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">
                                    Tambah Produk
                                </label>
                            </li>
                            <li><a className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">Reset</a></li>
                        </ul>
                    </details>
                </li>
                <li>
                    <details className="dropdown">
                        <summary className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">Pembelian</summary>
                        <ul className="p-2 menu dropdown-content z-[1] bg-blue-950 w-52">
                            <li>
                                <label
                                    htmlFor="my-drawer"
                                    aria-label="close sidebar"
                                    onClick={() => router.push("/pembelian/listpembelian")}
                                    className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">
                                    List Pembelian
                                </label>
                            </li>
                            <li>
                                <label
                                    htmlFor="my-drawer"
                                    aria-label="close sidebar"
                                    onClick={() => router.push("/pembelian/tambahpembelian")}
                                    className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">
                                    Tambah Pembelian
                                </label>
                            </li>
                            <li><a className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">Reset</a></li>
                        </ul>
                    </details>
                </li>
                <li>
                    <details className="dropdown">
                        <summary className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">Penjualan</summary>
                        <ul className="p-2 menu dropdown-content z-[1] bg-blue-950 w-52">
                            <li><a className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">List Penjualan</a></li>
                            <li><a className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">Penjualan</a></li>
                            <li><a className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">Tambah Penjualan</a></li>
                            <li><a className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">Reset</a></li>
                        </ul>
                    </details>
                </li>
                <li>
                    <details className="dropdown">
                        <summary className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">Pengeluaran</summary>
                        <ul className="p-2 menu dropdown-content z-[1] bg-blue-950 w-52">
                            <li><a className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">Kategori</a></li>
                            <li><a className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">List Pengeluaran</a></li>
                            <li><a className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">Tambah Pengeluaran</a></li>
                            <li><a className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">Reset</a></li>
                        </ul>
                    </details>
                </li>
                <li>
                    <details className="dropdown">
                        <summary className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">Pengembalian</summary>
                        <ul className="p-2 menu dropdown-content z-[1] bg-blue-950 w-52">
                            <li><a className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">Penjualan</a></li>
                            <li><a className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">Pembelian</a></li>
                        </ul>
                    </details>
                </li>
                <li>
                    <details className="dropdown">
                        <summary className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">Pemaketan</summary>
                        <ul className="p-2 menu dropdown-content z-[1] bg-blue-950 w-52">
                            <li><a className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">List Pemaketan</a></li>
                            <li><a className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">Reset</a></li>
                        </ul>
                    </details>
                </li>
                <li>
                    <details className="dropdown">
                        <summary className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">Akutansi</summary>
                        <ul className="p-2 menu dropdown-content z-[1] bg-blue-950 w-52">
                            <li><a className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">List Rekening</a></li>
                            <li><a className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">Tambah Rekening</a></li>
                            <li><a className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">Tranfer Uang</a></li>
                            <li><a className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">Neraca Keuangan</a></li>
                            <li><a className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">Rekening Nasabah</a></li>
                        </ul>
                    </details>
                </li>
                <li>
                    <details className="dropdown">
                        <summary className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">Reports</summary>
                        <ul className="p-2 menu dropdown-content z-[1] bg-blue-950 w-52">
                            <li><a className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">Report Ringkasan</a></li>
                            <li><a className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">Report Produk</a></li>
                            <li><a className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">Report Penjualan</a></li>
                            <li><a className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">Report Pembayaran</a></li>
                            <li><a className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">Penjualan Harian</a></li>
                            <li><a className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">Penjualan Bulanan</a></li>
                            <li><a className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">Pembelian Harian</a></li>
                            <li><a className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">Pembelian Bulanan</a></li>
                        </ul>
                    </details>
                </li>
                <li>
                    <details className="dropdown">
                        <summary className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">Pengguna</summary>
                        <ul className="p-2 menu dropdown-content z-[1] bg-blue-950 w-52">
                            <li><a className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">List Pengguna</a></li>
                            <li><a className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">Tambah Pengguna</a></li>
                            <li><a className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">List Costumer</a></li>
                            <li><a className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">Tambah Costumer</a></li>
                            <li><a className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">List Supplier</a></li>
                            <li><a className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">Tambah Supplier</a></li>
                        </ul>
                    </details>
                </li>
                <li><a className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">Toko</a></li>
                <li><a className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">Pengaturan</a></li>
                <li><a className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">Logout</a></li>
            </ul>

        </div>
    )
}
export default DrawerSide