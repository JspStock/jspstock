import { getExpenditures, getPurchase, getPurchaseReturn, getSale, getSaleReturn } from "@/app/(public)/(main)/reports/repringkasan/action"
import { SearchParams } from "@/app/(public)/(main)/reports/repringkasan/page"
import { currencyFormat } from "@/utils/utils"
import dynamic from "next/dynamic"

const Card = dynamic(() => import('@/app/components/reports/ringkasan/card'))

const WrapContent = async ({ searchParams }: {
    searchParams: SearchParams
}) => {
    const [purchase, sale, saleReturn, purchaseReturn, expenditures] = await Promise.all([
        getPurchase(searchParams),
        getSale(searchParams),
        getSaleReturn(searchParams),
        getPurchaseReturn(searchParams),
        getExpenditures(searchParams)
    ])

    return <div className="grid lg:grid-cols-3 md:grid-cols-2 max-md:grid-cols-1 gap-5">
        <Card
            title="Pembelian"
            content={[
                {
                    key: 'Total',
                    value: currencyFormat(sale.map(e => e.saleOrder.map(a => a.qty * (a.product.price - a.product.cost)).reduce((val, prev) => val + prev) - e.discount).reduce((val, prev) => val + prev, 0))
                },
                {
                    key: 'Jumlah transaksi',
                    value: `${purchase.length} Transaksi`
                },
            ]} />

            <Card
                title="Penjualan"
                content={[
                    {
                        key: 'Total',
                        value: currencyFormat(sale.length > 0 ? sale.map(e => (e.shippingCost + e.saleOrder.map(a => a.qty * a.product.price).reduce((val, prev) => val + prev)) - e.discount).reduce((val, prev) => val + prev) : 0)
                    },
                    {
                        key: 'Jumlah transaksi',
                        value: `${sale.length} Transaksi`
                    },
                    {
                        key: 'Biaya Pengirim',
                        value: currencyFormat(sale.length > 0 ? sale.map(e => e.shippingCost).reduce((val, prev) => val + prev) : 0)
                    },
                    {
                        key: 'Diskon',
                        value: currencyFormat(sale.length > 0 ? sale.map(e => e.discount).reduce((val, prev) => val + prev) : 0)
                    },
                    {
                        key: 'Dibayar',
                        value: currencyFormat(sale.length > 0 ? sale.map(e => e.saleOrder.map(a => a.qty * a.product.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0)
                    }
                ]} />

            <Card
                title="Pengembalian Penjualan"
                content={[
                    {
                        key: 'Total',
                        value: currencyFormat(saleReturn.length > 0 ? saleReturn.map(e => e.saleReturnOrders.map(a => a.qty * a.product!.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0),
                    },
                    {
                        key: 'Jumlah transaksi',
                        value: `${saleReturn.length} Transaksi`
                    },
                ]} />

            <Card
                title="Pengembalian Pembelian"
                content={[
                    {
                        key: 'Total',
                        value: currencyFormat(purchaseReturn.map(e => e.purchase.total).reduce((val, prev) => val + prev, 0))
                    },
                    {
                        key: 'Jumlah transaksi',
                        value: `${purchaseReturn.length} Transaksi`
                    }
                ]} />

            <Card 
                title="Laporan Laba Rugi"
                content={[
                    {
                        key: 'Penjualan',
                        value: currencyFormat(sale.length > 0 ? sale.map(e => (e.saleOrder.map(a => a.qty * a.product.price).reduce((val, prev) => val + prev))).reduce((val, prev) => val + prev) : 0)
                    },
                    {
                        key: 'Biaya Produk(-)',
                        value: currencyFormat(sale.map(e => e.saleOrder.map(a => a.qty * (a.product.price - a.product.cost)).reduce((val, prev) => val + prev) - e.discount).reduce((val, prev) => val + prev, 0))
                    },
                    {
                        key: 'Laba/Profit',
                        value: currencyFormat(
                            (sale.length > 0 ? sale.map(e => e.saleOrder.map(a => a.qty * a.product.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0) -
                            (sale.map(e => e.saleOrder.map(a => a.qty * (a.product.price - a.product.cost)).reduce((val, prev) => val + prev) - e.discount).reduce((val, prev) => val + prev, 0))
                        )
                    }
                ]}/>

            <Card
                title="Laporan Laba Rugi dengan Pengembalian"
                content={[
                    {
                        key: 'Penjualan',
                        value: currencyFormat(sale.length > 0 ? sale.map(e => e.saleOrder.map(a => a.qty * a.product.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0)
                    },
                    {
                        key: 'Biaya Produk(-)',
                        value: currencyFormat(sale.map(e => e.saleOrder.map(a => a.qty * (a.product.price - a.product.cost)).reduce((val, prev) => val + prev) - e.discount).reduce((val, prev) => val + prev, 0))
                    },
                    {
                        key: 'Pengembalian Penjualan(-)',
                        value: currencyFormat(saleReturn.length > 0 ? saleReturn.map(e => e.saleReturnOrders.map(a => a.qty * a.product!.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0)
                    },
                    {
                        key: 'Pengembalian Pembelian',
                        value: currencyFormat(purchaseReturn.map(e => e.purchase.total).reduce((val, prev) => val + prev, 0))
                    },
                    {
                        key: 'Laba/Profit',
                        value: currencyFormat(
                            (sale.length > 0 ? sale.map(e => e.saleOrder.map(a => a.qty * a.product.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0) -
                            (sale.map(e => e.saleOrder.map(a => a.qty * (a.product.price - a.product.cost)).reduce((val, prev) => val + prev) - e.discount).reduce((val, prev) => val + prev, 0)) -
                            (saleReturn.length > 0 ? saleReturn.map(e => e.saleReturnOrders.map(a => a.qty * a.product!.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0) +
                            (purchaseReturn.map(e => e.purchase.total).reduce((val, prev) => val + prev, 0))
                        )
                    }
                ]} />

            <Card   
                title="Analisis Laba/Profit Bersih"
                content={[
                    {
                        key: "Penjualan",
                        value: currencyFormat(sale.length > 0 ? sale.map(e =>  e.saleOrder.map(a => a.qty * a.product.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0)
                    },
                    {
                        key: "Biaya Produk(-)",
                        value: currencyFormat(sale.map(e => e.saleOrder.map(a => a.qty * (a.product.price - a.product.cost)).reduce((val, prev) => val + prev) - e.discount).reduce((val, prev) => val + prev, 0))
                    },
                    {
                        key: "Pengembalian Penjualan(-)",
                        value: currencyFormat(saleReturn.length > 0 ? saleReturn.map(e => e.saleReturnOrders.map(a => a.qty * a.product!.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0)
                    },
                    {
                        key: "Pengembalian Pembelian",
                        value: currencyFormat(purchaseReturn.map(e => e.purchase.total).reduce((val, prev) => val + prev, 0))
                    },
                    {
                        key: "Pengeluaran(-)",
                        value: currencyFormat(expenditures.length > 0 ? expenditures.map(e => e.total).reduce((val, prev) => val + prev) : 0)
                    },
                    {
                        key: "Total",
                        value: currencyFormat(
                            (sale.length > 0 ? sale.map(e => e.saleOrder.map(a => a.qty * a.product.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0) -
                            (sale.map(e => e.saleOrder.map(a => a.qty * (a.product.price - a.product.cost)).reduce((val, prev) => val + prev) - e.discount).reduce((val, prev) => val + prev, 0)) - 
                            (saleReturn.length > 0 ? saleReturn.map(e => e.saleReturnOrders.map(a => a.qty * a.product!.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0) +
                            (purchaseReturn.map(e => e.purchase.total).reduce((val, prev) => val + prev, 0)) -
                            (expenditures.length > 0 ? expenditures.map(e => e.total).reduce((val, prev) => val + prev) : 0)
                        )
                    }
                ]}/>

            <Card 
                title="Pengeluaran"
                content={[
                    {
                        key: 'Total',
                        value: currencyFormat(expenditures.length > 0 ? expenditures.map(e => e.total).reduce((val, prev) => val + prev) : 0)
                    },
                    {
                        key: 'Jumlah Transaksi',
                        value: `${expenditures.length} Transaksi`
                    }
                ]}/>

            <Card
                title="Laporan Pendapatan Toko"
                content={[
                    {
                        key: "Penjualan",
                        value: currencyFormat(sale.length > 0 ? sale.map(e => e.saleOrder.map(a => a.qty * a.product.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0)
                    },
                    {
                        key: "Biaya produk(-)",
                        value: currencyFormat(sale.map(e => e.saleOrder.map(a => a.qty * (a.product.price - a.product.cost)).reduce((val, prev) => val + prev) - e.discount).reduce((val, prev) => val + prev, 0))
                    },
                    {
                        key: "Pengembalian Penjualan(-)",
                        value: currencyFormat(saleReturn.length > 0 ? saleReturn.map(e => e.saleReturnOrders.map(a => a.qty * a.product!.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0)
                    },
                    {
                        key: "Pengembalian Pembelian",
                        value: currencyFormat(purchaseReturn.map(e => e.purchase.total).reduce((val, prev) => val + prev, 0))
                    },
                    {
                        key: "Pendapatan",
                        value: currencyFormat(
                            (sale.length > 0 ? sale.map(e => e.saleOrder.map(a => a.qty * a.product.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0) -
                            (sale.map(e => e.saleOrder.map(a => a.qty * (a.product.price - a.product.cost)).reduce((val, prev) => val + prev) - e.discount).reduce((val, prev) => val + prev, 0)) -
                            (saleReturn.length > 0 ? saleReturn.map(e => e.saleReturnOrders.map(a => a.qty * a.product!.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0) +
                            (purchaseReturn.map(e => e.purchase.total).reduce((val, prev) => val + prev, 0))
                        )
                    }
                ]} />
    </div>
}

export default WrapContent