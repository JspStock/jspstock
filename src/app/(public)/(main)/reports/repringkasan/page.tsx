import dynamic from "next/dynamic"

const Datepicker = dynamic(() => import("@/app/components/reports/ringkasan/datepicker"))
const CardPembelian = dynamic(() => import("@/app/components/reports/ringkasan/cardpembelian"))
const CardPenjualan = dynamic(() => import("@/app/components/reports/ringkasan/cardpenjual"))
const Cardpengembalianpenjualan = dynamic(() => import("@/app/components/reports/ringkasan/cardpengempenjualan"))
const Cardpengembalianpembelian = dynamic(() => import("@/app/components/reports/ringkasan/cardpengempembelian"))
const Cardlabaprofit = dynamic(() => import("@/app/components/reports/ringkasan/cardlabaprofit"))
const Cardlabaprofitbersih = dynamic(() => import("@/app/components/reports/ringkasan/cardlababersih"))
const Cardpembayaranditerima = dynamic(() => import("@/app/components/reports/ringkasan/cardpembayaranditerima"))
const Cardpembayaranditerkirim = dynamic(() => import("@/app/components/reports/ringkasan/cardpembayaranterkirim"))
const Cardpengeluaran = dynamic(() => import("@/app/components/reports/ringkasan/cardpengeluaran"))
const Cardpenggajian = dynamic(() => import("@/app/components/reports/ringkasan/cardpenggajian"))
const Carduangtunai = dynamic(() => import("@/app/components/reports/ringkasan/carduangtunai"))

export default function RepRingkasan() {
    return (
        <>
            <div className="lg:flex mb-5 w-full items-center justify-center p-5 bg-white rounded-lg space-x-2">
                <Datepicker />
                <button className="btn bg-blue-900 mt-9 text-white">Submit</button>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 max-md:grid-cols-1 gap-5">
                <CardPembelian />
                <CardPenjualan />
                <Cardpengembalianpenjualan />
                <Cardpengembalianpembelian />
                <Cardlabaprofit />
                <Cardlabaprofitbersih />
                <Cardpembayaranditerima />
                <Cardpembayaranditerkirim />
                <Cardpengeluaran />
                <Cardpenggajian />
                <Carduangtunai />
            </div>
        </>
    )
}