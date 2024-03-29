import { Metadata } from "next"
import dynamic from "next/dynamic"
import AllowedRoleWrapper from "@/app/components/allowedRoleWrapper"

const BackButon = dynamic(() => import('@/app/components/backButton'))
const Form = dynamic(() => import("@/app/components/pengguna/tambah/form"))

export const metadata: Metadata = {
    title: 'Tambah Pengguna'
}

const TambahPengguna = async () => {
    return <AllowedRoleWrapper>
        <main className="bg-white p-14">
            <BackButon />
            <div className="mt-5">
                <h1 className="text-gray-900 font-semibold text-xl">Tambah Pengguna</h1>
                <h1 className="text-gray-400 text-sm">Label pada kotak yang ditandai dengan * adalah Wajib di input.</h1>
            </div>
            <Form />
        </main>
    </AllowedRoleWrapper>
}
export default TambahPengguna