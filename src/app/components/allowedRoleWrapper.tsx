import { cookies } from "next/headers"
import { ReactNode } from "react"

const AllowedRoleWrapper = ({
    children
}: {
    children: ReactNode
}) => {
    if(['owner', 'admin'].includes(cookies().get('role')!.value.toLowerCase())){
        return children
    }else{
        return <div className="bg-white p-14">
            <h1 className="text-2xl text-center font-semibold">Maaf anda tidak punya akses ke halaman ini!</h1>
        </div>
    }
}

export default AllowedRoleWrapper