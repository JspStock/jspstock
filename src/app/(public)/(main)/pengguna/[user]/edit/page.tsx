import { Metadata } from "next"
import dynamic from "next/dynamic"
import AllowedRoleWrapper from "@/app/components/allowedRoleWrapper"
import { getUserData, getUserName } from "./action"
import { redirect } from "next/navigation"

const BackButon = dynamic(() => import('@/app/components/backButton'))
const Form = dynamic(() => import("@/app/components/pengguna/[user]/edit/form"))

interface Params {
    user: string
}

export const generateMetadata = async ({ params }: { params: Params }): Promise<Metadata> => {
    const name = await getUserName(params.user)
    return {
        title: `Edit pengguna ${name?.name}`
    }
}

const TambahPengguna = async ({ params }: { params: Params }) => {
    const user = await getUserData(params.user)

    return user ? <AllowedRoleWrapper>
        <main className="bg-white p-14">
            <BackButon />
            <div className="mt-5">
                <h1 className="text-gray-900 font-semibold text-xl">Edit Pengguna</h1>
                <h1 className="text-gray-400 text-sm">Label pada kotak yang ditandai dengan * adalah Wajib di input.</h1>
            </div>
            <Form user={user} />
        </main>
    </AllowedRoleWrapper> : redirect("/pengguna")
}
export default TambahPengguna