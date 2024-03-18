import dynamic from "next/dynamic"

const Form = dynamic(() => import("@/app/components/pengaturan/form"))
const FormPass = dynamic(() => import("@/app/components/pengaturan/formpassword"))

const Pengaturan = () => {
    return (
        <>
            <main className="bg-white p-14">
                <h1 className="text-gray-900 font-semibold text-xl">Update Profil</h1>
                <h1 className="text-gray-400 text-sm">Label pada kotak yang ditandai dengan * adalah Wajib di input.</h1>
                <Form />
            </main>
            <main className="bg-white p-14 mt-5">
                <h1 className="text-gray-900 font-semibold text-xl">Ganti Kata Sandi</h1>
                <h1 className="text-gray-400 text-sm">Label pada kotak yang ditandai dengan * adalah Wajib di input.</h1>
                <FormPass />
            </main>
        </>
    )
}
export default Pengaturan