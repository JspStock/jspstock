import dynamic from "next/dynamic";

const CardDash = dynamic(() => import("@/app/components/dashboard/carddash"))
const FilterDrop = dynamic(() => import("@/app/components/dashboard/filter"))

export default function Home() {
  return (
    <>
      <h1 className="text-gray-900 font-bold text-xl lg:text-2xl">Selamat Datang Admin</h1>
      <FilterDrop />
      <div className="my-10 grid lg:grid-cols-2 gap-5 lg:mx-20">
        <CardDash
          image="https://res.cloudinary.com/dblroye9s/image/upload/v1710153975/jspstock/wallet_hdizhi.svg"
          title="Pendapatan"
          value="10.000.00"
        />
        <CardDash
          image="https://res.cloudinary.com/dblroye9s/image/upload/v1710153976/jspstock/profit_pqculp.svg"
          title="Profit"
          value="10.000.000.00"
        />
        <CardDash
          image="https://res.cloudinary.com/dblroye9s/image/upload/v1710153975/jspstock/penjualan_aw4nyc.svg"
          title="Pengembalian Penjualan"
          value="10.000.000.00"
        />
        <CardDash
          image="https://res.cloudinary.com/dblroye9s/image/upload/v1710153975/jspstock/pembelian_pe1ei0.svg"
          title="Pengembalian Pembelian"
          value="10.000.000.00"
        />
      </div>
    </>
  );
}
