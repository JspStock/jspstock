export interface LinkNav {
    icon?: string,
    text: string,
    link: string,
    isShow?: boolean,
    subMenu?: Array<LinkNav>,
}

export const linkNav = ({ role }: { role: string }) => {
    const validateRole = (validRole: Array<string>) => validRole.includes(role)

    return [
        {
            icon: "https://res.cloudinary.com/dblroye9s/image/upload/v1710781627/jspstock/sidebar/dashboard_uva3er.svg",
            text: "Dashboard",
            link: "/dashboard"
        },
        {
            icon: "https://res.cloudinary.com/dblroye9s/image/upload/v1710781632/jspstock/sidebar/produk_pztagq.svg",
            text: "Produk",
            link: "/produk",
            subMenu: [
                {
                    text: "Kategori",
                    link: "/kategori"
                },
                {
                    text: "Daftar Produk",
                    link: "/listproduk",
                }
            ]
        },
        {
            icon: "https://res.cloudinary.com/dblroye9s/image/upload/v1710782625/pembelian_uk3kyv.svg",
            text: "Pembelian",
            link: "/pembelian",
            subMenu: [
                {
                    text: "Daftar Pembelian",
                    link: "/listpembelian"
                },
                {
                    text: "Tambah Pembelian",
                    link: "/tambahpembelian"
                }
            ]
        },
        {
            icon: "https://res.cloudinary.com/dblroye9s/image/upload/v1710781631/jspstock/sidebar/penjualan_srtdrp.svg",
            text: "Penjualan",
            link: "/penjualan",
            subMenu: [
                {
                    text: "Daftar Penjualan",
                    link: "/listpenjualan"
                },
                {
                    text: "Tambah Penjualan",
                    link: "/tambahpenjualan"
                }
            ]
        },
        {
            icon: "https://res.cloudinary.com/dblroye9s/image/upload/v1710781629/jspstock/sidebar/pengeluaran_l9oyl9.svg",
            text: "Pengeluaran",
            link: "/pengeluaran",
            subMenu: [
                {
                    text: "Kategori Pengeluaran",
                    link: "/kategoripengeluaran"
                },
                {
                    text: "Daftar Pengeluaran",
                    link: "/listpengeluaran"
                },
                {
                    text: "Tambah Pengeluaran",
                    link: "/listpengeluaran/tambah"
                }
            ]
        },
        {
            icon: "https://res.cloudinary.com/dblroye9s/image/upload/v1710153975/jspstock/penjualan_aw4nyc.svg",
            text: "Pengembalian",
            link: "/pengembalian",
            subMenu: [
                {
                    text: "Penjualan",
                    link: "/penjualan"
                },
                {
                    text: "Pembelian",
                    link: "/pembelian"
                }
            ]
        },
        {
            icon: "https://res.cloudinary.com/dblroye9s/image/upload/v1710781627/jspstock/sidebar/pemaketan_rxexdk.svg",
            text: "Pemaketan",
            link: "/pemaketan",
            subMenu: [
                {
                    text: "Daftar Pemaketan",
                    link: "/listpemaketan"
                }
            ]
        },
        {
            icon: "https://res.cloudinary.com/dblroye9s/image/upload/v1710781627/jspstock/sidebar/akutan_qiach6.svg",
            link: "/akutansi",
            text: "Akutansi",
            subMenu: [
                {
                    text: 'Daftar Rekening',
                    link: '/listrekening'
                },
                {
                    text: 'Tambah Rekening',
                    link: '/listrekening/tambah'
                },
                {
                    text: 'Transfer Uang',
                    link: '/transferuang'
                },
                {
                    text: 'Neraca Uang',
                    link: '/neraca'
                },
                {
                    text: 'Rekening Nasabah',
                    link: '/rekeningnasabah'
                }
            ]
        },
        {
            icon: 'https://res.cloudinary.com/dblroye9s/image/upload/v1710781633/jspstock/sidebar/reports_tfy1tk.svg',
            text: 'Laporan',
            link: '/reports',
            subMenu: [
                {
                    text: 'Laporan Ringkasan',
                    link: '/repringkasan'
                },
                {
                    text: 'Laporan Produk',
                    link: '/repproduk'
                },
                {
                    text: 'Laporan Penjualan',
                    link: '/reports'
                },
                {
                    text: 'Laporan Pembayaran',
                    link: '/reppembayaran'
                },
                {
                    text: 'Laporan Penjualan',
                    link: "/penjualan",
                    subMenu: [
                        {
                            text: "Harian",
                            link: '/harian'
                        },
                        {
                            text: 'Bulanan',
                            link: '/bulanan'
                        }
                    ]
                },
                {
                    text: 'Laporan Pembelian',
                    link: '/pembelian',
                    subMenu: [
                        {
                            text: 'Harian',
                            link: '/harian'
                        },
                        {
                            text: 'Bulanan',
                            link: '/bulanan'
                        }
                    ]
                },
            ]
        },
        {
            icon: 'https://res.cloudinary.com/dblroye9s/image/upload/v1710781630/jspstock/sidebar/pengguna_zhan3b.svg',
            text: 'Pengguna',
            link: '/pengguna',
            subMenu: [
                {
                    text: 'Grup Kustomer',
                    link: '/grupcostomer'
                },
                {
                    text: 'Daftar Pengguna',
                    link: '',
                    isShow: validateRole(['admin', 'owner']),
                },
                {
                    text: 'Daftar Kustomer',
                    link: '/costomer'
                },
                {
                    text: 'Supplier',
                    link: '/supplier'
                }
            ]
        },
        {
            icon: 'https://res.cloudinary.com/dblroye9s/image/upload/v1710781636/jspstock/sidebar/toko_a1xwi9.svg',
            text: 'Toko',
            link: '/toko',
            isShow: validateRole(['owner'])
        },
        {
            icon: 'https://res.cloudinary.com/dblroye9s/image/upload/v1710781635/jspstock/sidebar/settings_kmuf2y.svg',
            text: 'Pengaturan',
            link: '/pengaturan/profil'
        }
    ]
}