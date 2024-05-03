import dynamic from "next/dynamic"
import { ReactNode } from "react"

const AllowedRoleWrapper = dynamic(() => import('@/app/components/allowedRoleWrapper'))

const layout = ({
    children
}: {
    children: ReactNode
}) => {
    return <AllowedRoleWrapper allowed={['owner', 'staff']}>
        { children }
    </AllowedRoleWrapper>
}

export default layout