"use client"
import Image from "next/image"
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
                        className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950 p-3">
                        <Image
                            src="https://res.cloudinary.com/dblroye9s/image/upload/v1710781627/jspstock/sidebar/dashboard_uva3er.svg"
                            alt="logo"
                            height={100}
                            className="w-4"
                            width={100}
                        />
                        Dashboard
                    </label>
                </li>
                <li>
                    <details className="dropdown">
                        <summary className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950 p-3">
                            <Image
                                src="https://res.cloudinary.com/dblroye9s/image/upload/v1710781632/jspstock/sidebar/produk_pztagq.svg"
                                alt="logo"
                                height={100}
                                className="w-4"
                                width={100}
                            />
                            Produk</summary>
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
                        <summary className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950 p-3">
                            <Image
                                src="https://res.cloudinary.com/dblroye9s/image/upload/v1710782625/pembelian_uk3kyv.svg"
                                alt="logo"
                                height={100}
                                className="w-4"
                                width={100}
                            />
                            Pembelian</summary>
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
                        <summary className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950 p-3">
                            <Image
                                src="https://res.cloudinary.com/dblroye9s/image/upload/v1710781631/jspstock/sidebar/penjualan_srtdrp.svg"
                                alt="logo"
                                height={100}
                                className="w-4"
                                width={100}
                            />
                            Penjualan</summary>
                        <ul className="p-2 menu dropdown-content z-[1] bg-blue-950 w-52">
                            <li>
                                <label
                                    htmlFor="my-drawer"
                                    aria-label="close sidebar"
                                    onClick={() => router.push("/penjualan/listpenjualan")}
                                    className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">
                                    List Penjualan
                                </label></li>
                            <li>
                                <label
                                    htmlFor="my-drawer"
                                    aria-label="close sidebar"
                                    onClick={() => router.push("/penjualan/tambahpenjualan")}
                                    className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">
                                    Tambah Penjualan
                                </label>
                            </li>
                            <li><a className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">Reset</a></li>
                        </ul>
                    </details>
                </li>
                <li>
                    <details className="dropdown">
                        <summary className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950 p-3">
                            <Image
                                src="https://res.cloudinary.com/dblroye9s/image/upload/v1710781629/jspstock/sidebar/pengeluaran_l9oyl9.svg"
                                alt="logo"
                                height={100}
                                className="w-4"
                                width={100}
                            />
                            Pengeluaran</summary>
                        <ul className="p-2 menu dropdown-content z-[1] bg-blue-950 w-52">
                            <li>
                                <label
                                    htmlFor="my-drawer"
                                    aria-label="close sidebar"
                                    onClick={() => router.push("/pengeluaran/kategoripengeluaran")}
                                    className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">
                                    Kategori Pengeluaran
                                </label>
                            </li>
                            <li>
                                <label
                                    htmlFor="my-drawer"
                                    aria-label="close sidebar"
                                    onClick={() => router.push("/pengeluaran/listpengeluaran")}
                                    className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">
                                    List Pengeluaran
                                </label>
                            </li>
                            <li>
                                <label
                                    htmlFor="my-drawer"
                                    aria-label="close sidebar"
                                    onClick={() => router.push("/pengeluaran/listpengeluaran/tambah")}
                                    className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">
                                    Tambah Pengeluaran
                                </label>
                            </li>
                            <li><a className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">Reset</a></li>
                        </ul>
                    </details>
                </li>
                <li>
                    <details className="dropdown">
                        <summary className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950 p-3">
                            <Image
                                src="https://res.cloudinary.com/dblroye9s/image/upload/v1710153975/jspstock/penjualan_aw4nyc.svg"
                                alt="logo"
                                height={100}
                                className="w-4"
                                width={100}
                            />
                            Pengembalian</summary>
                        <ul className="p-2 menu dropdown-content z-[1] bg-blue-950 w-52">
                            <li>
                                <label
                                    htmlFor="my-drawer"
                                    aria-label="close sidebar"
                                    onClick={() => router.push("/pengembalian/penjualan")}
                                    className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">
                                    Penjualan
                                </label>
                            </li>
                            <li>
                                <label
                                    htmlFor="my-drawer"
                                    aria-label="close sidebar"
                                    onClick={() => router.push("/pengembalian/pembelian")}
                                    className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">
                                    Pembelian
                                </label>
                            </li>
                        </ul>
                    </details>
                </li>
                <li>
                    <details className="dropdown">
                        <summary className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950 p-3">
                            <Image
                                src="https://res.cloudinary.com/dblroye9s/image/upload/v1710781627/jspstock/sidebar/pemaketan_rxexdk.svg"
                                alt="logo"
                                height={100}
                                className="w-4"
                                width={100}
                            />
                            Pemaketan</summary>
                        <ul className="p-2 menu dropdown-content z-[1] bg-blue-950 w-52">
                            <li>
                                <label
                                    htmlFor="my-drawer"
                                    aria-label="close sidebar"
                                    onClick={() => router.push("/pemaketan/listpemaketan")}
                                    className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">
                                    List Pemaketan
                                </label>
                            </li>
                            <li><a className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">Reset</a></li>
                        </ul>
                    </details>
                </li>
                <li>
                    <details className="dropdown">
                        <summary className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950 p-3">
                            <Image
                                src="https://res.cloudinary.com/dblroye9s/image/upload/v1710781627/jspstock/sidebar/akutan_qiach6.svg"
                                alt="logo"
                                height={100}
                                className="w-4"
                                width={100}
                            />
                            Akutansi</summary>
                        <ul className="p-2 menu dropdown-content z-[1] bg-blue-950 w-52">
                            <li>
                                <label
                                    htmlFor="my-drawer"
                                    aria-label="close sidebar"
                                    onClick={() => router.push("/akutansi/listrekening")}
                                    className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">
                                    List Rekening
                                </label>
                            </li>
                            <li>
                                <label
                                    htmlFor="my-drawer"
                                    aria-label="close sidebar"
                                    onClick={() => router.push("/akutansi/listrekening/tambah")}
                                    className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">
                                    Tambah Rekening
                                </label>
                            </li>
                            <li>
                                <label
                                    htmlFor="my-drawer"
                                    aria-label="close sidebar"
                                    onClick={() => router.push("/akutansi/transferuang")}
                                    className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">
                                    Transfer Uang
                                </label>
                            </li>
                            <li>
                                <label
                                    htmlFor="my-drawer"
                                    aria-label="close sidebar"
                                    onClick={() => router.push("/akutansi/neraca")}
                                    className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">
                                    Neraca Keuangan
                                </label>
                            </li>
                            <li>
                                <label
                                    htmlFor="my-drawer"
                                    aria-label="close sidebar"
                                    onClick={() => router.push("/akutansi/rekeningnasabah")}
                                    className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">
                                    Rekening Nasabah
                                </label>
                            </li>
                        </ul>
                    </details>
                </li>
                <li>
                    <details className="dropdown">
                        <summary className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950 p-3">
                            <Image
                                src="https://res.cloudinary.com/dblroye9s/image/upload/v1710781633/jspstock/sidebar/reports_tfy1tk.svg"
                                alt="logo"
                                height={100}
                                className="w-4"
                                width={100}
                            />
                            Reports</summary>
                        <ul className="p-2 menu dropdown-content z-[1] bg-blue-950 w-52">
                            <li>
                                <label
                                    htmlFor="my-drawer"
                                    aria-label="close sidebar"
                                    onClick={() => router.push("/reports/repringkasan")}
                                    className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">
                                    Report Ringkasan
                                </label>
                            </li>
                            <li>
                                <label
                                    htmlFor="my-drawer"
                                    aria-label="close sidebar"
                                    onClick={() => router.push("/reports/repproduk")}
                                    className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">
                                    Report Produk
                                </label>
                            </li>
                            <li>
                                <label
                                    htmlFor="my-drawer"
                                    aria-label="close sidebar"
                                    onClick={() => router.push("/reports")}
                                    className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">
                                    Reports Penjualan
                                </label>
                            </li>
                            <li>
                                <label
                                    htmlFor="my-drawer"
                                    aria-label="close sidebar"
                                    onClick={() => router.push("/reports/reppembayaran")}
                                    className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">
                                    Report Pembayaran
                                </label>
                            </li>
                            <li>
                                <label
                                    htmlFor="my-drawer"
                                    aria-label="close sidebar"
                                    onClick={() => router.push("/reports/penjualan/harian")}
                                    className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">
                                    Penjualan Harian
                                </label>
                            </li>
                            <li>
                                <label
                                    htmlFor="my-drawer"
                                    aria-label="close sidebar"
                                    onClick={() => router.push("/reports/penjualan/bulanan")}
                                    className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">
                                    Penjualan Bulanan
                                </label>
                            </li>
                            <li>
                                <label
                                    htmlFor="my-drawer"
                                    aria-label="close sidebar"
                                    onClick={() => router.push("/reports/pembelian/harian")}
                                    className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">
                                    Pembelian Harian
                                </label>
                            </li>
                            <li>
                                <label
                                    htmlFor="my-drawer"
                                    aria-label="close sidebar"
                                    onClick={() => router.push("/reports/pembelian/bulanan")}
                                    className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">
                                    Pembelian Bulanan
                                </label>
                            </li>
                        </ul>
                    </details>
                </li>
                <li>
                    <details className="dropdown">
                        <summary className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950 p-3">
                            <Image
                                src="https://res.cloudinary.com/dblroye9s/image/upload/v1710781630/jspstock/sidebar/pengguna_zhan3b.svg"
                                alt="logo"
                                height={100}
                                className="w-4"
                                width={100}
                            />
                            Pengguna</summary>
                        <ul className="p-2 menu dropdown-content z-[1] bg-blue-950 w-52">
                            <li>
                                <label
                                    htmlFor="my-drawer"
                                    aria-label="close sidebar"
                                    onClick={() => router.push("/pengguna/role")}
                                    className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">
                                    Role
                                </label>
                            </li>
                            <li>
                                <label
                                    htmlFor="my-drawer"
                                    aria-label="close sidebar"
                                    onClick={() => router.push("/pengguna/grupcostomer")}
                                    className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">
                                    Grup Costomer
                                </label>
                            </li>
                            <li>
                                <label
                                    htmlFor="my-drawer"
                                    aria-label="close sidebar"
                                    onClick={() => router.push("/pengguna")}
                                    className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">
                                    List Pengguna
                                </label>
                            </li>
                            <li>
                                <label
                                    htmlFor="my-drawer"
                                    aria-label="close sidebar"
                                    onClick={() => router.push("/pengguna/costomer")}
                                    className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">
                                    List Costomer
                                </label>
                            </li>
                            <li>
                                <label
                                    htmlFor="my-drawer"
                                    aria-label="close sidebar"
                                    onClick={() => router.push("/pengguna/supplier")}
                                    className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950">
                                    List Supplier
                                </label>
                            </li>
                        </ul>
                    </details>
                </li>
                <li>
                    <label
                        htmlFor="my-drawer"
                        aria-label="close sidebar"
                        onClick={() => router.push("/toko")}
                        className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950 p-3">
                        <Image
                            src="https://res.cloudinary.com/dblroye9s/image/upload/v1710781636/jspstock/sidebar/toko_a1xwi9.svg"
                            alt="logo"
                            height={100}
                            className="w-4"
                            width={100}
                        />
                        Toko
                    </label>
                </li>
                <li>
                    <label
                        htmlFor="my-drawer"
                        aria-label="close sidebar"
                        onClick={() => router.push("/pengaturan/profil")}
                        className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950 p-3">
                        <Image
                            src="https://res.cloudinary.com/dblroye9s/image/upload/v1710781635/jspstock/sidebar/settings_kmuf2y.svg"
                            alt="logo"
                            height={100}
                            className="w-4"
                            width={100}
                        />
                        Pengaturan
                    </label>
                </li>
                <li><a className="hover:bg-white hover:text-blue-950 active:bg-white active:text-blue-950 p-3">Logout</a></li>
            </ul>

        </div>
    )
}
export default DrawerSide