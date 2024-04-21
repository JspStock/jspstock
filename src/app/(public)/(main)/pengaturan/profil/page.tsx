import { Metadata } from "next"
import dynamic from "next/dynamic"
import { getProfileData } from "./action"
import { redirect } from "next/navigation"

const Form = dynamic(() => import("@/app/components/pengaturan/form"))
const FormPass = dynamic(() => import("@/app/components/pengaturan/formpassword"))

export const metadata: Metadata = {
    title: 'Pengaturan'
}

const Pengaturan = async () => {
    const profile = await getProfileData()

    if (profile) {
        return (
            <>
                <main className="bg-white p-14">
                    <h1 className="text-gray-900 font-semibold text-xl">Update Profil</h1>
                    <h1 className="text-gray-400 text-sm">Label pada kotak yang ditandai dengan * adalah Wajib di input.</h1>
                    <Form data={profile} />
                </main>
                <main className="bg-white p-14 mt-5">
                    <h1 className="text-gray-900 font-semibold text-xl">Ganti Kata Sandi</h1>
                    <h1 className="text-gray-400 text-sm">Label pada kotak yang ditandai dengan * adalah Wajib di input.</h1>
                    <FormPass id={profile.id} />
                </main>
            </>
        )
    }else{
        return redirect("/auth/signin")
    }
}
export default Pengaturan