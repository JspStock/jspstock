import dynamic from "next/dynamic"

const BackButton = dynamic(() => import('@/app/components/backButton'))
const Form = dynamic(() => import('@/app/components/penjualan/listpenjualan/(ref)/(pembayaran)/form'))

const pembayaran = () => {
    return <div className="p-10 bg-white rounded-xl">
        <BackButton />

        <div className="mt-5">
            <Form />
        </div>
    </div>
}

export default pembayaran