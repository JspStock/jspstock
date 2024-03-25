import dynamic from "next/dynamic"

const Loader = dynamic(() => import('@/app/components/loader'))

const loading = () => {
    return <Loader />
}

export default loading