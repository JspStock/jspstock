import dynamic from "next/dynamic";
import Image from "next/image";
import Wallet from "@/app/components/dashboard/svg/wallet.svg"
import Profit from "@/app/components/dashboard/svg/profit.svg"
import Pembelian from "@/app/components/dashboard/svg/pembelian.svg"
import Penjualan from "@/app/components/dashboard/svg/penjualan.svg"

const CardDash = dynamic(() => import("@/app/components/dashboard/carddash"))
const FilterDrop = dynamic(() => import("@/app/components/dashboard/filter"))

export default function Home() {
  return (
    <>
      <h1 className="text-gray-900 font-bold text-xl lg:text-2xl">Selamat Datang Admin</h1>
      <FilterDrop />
      <div className="my-10 grid lg:grid-cols-2 gap-5 lg:mx-20">
        <CardDash
          image={Wallet}
          title="Pendapatan"
          value="10.000.00"
        />
        <CardDash
          image={Profit}
          title="Profit"
          value="10.000.000.00"
        />
        <CardDash
          image={Penjualan}
          title="Pengembalian Penjualan"
          value="10.000.000.00"
        />
        <CardDash
          image={Pembelian}
          title="Pengembalian Pembelian"
          value="10.000.000.00"
        />
      </div>
    </>
  );
}
