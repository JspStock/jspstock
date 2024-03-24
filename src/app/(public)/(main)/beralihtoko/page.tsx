import dynamic from "next/dynamic"

const Form = dynamic(() => import("@/app/components/beralihtoko/form"))

const Beralihtoko = () => {
    return (
        <>
            <main className="bg-white p-14">
                <h1 className="text-gray-900 font-semibold text-xl">Apakah Kamu ingin Beralih Toko?</h1>
                <Form />
            </main>
        </>
    )
}
export default Beralihtoko