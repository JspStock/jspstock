import dynamic from "next/dynamic";

const Loader = dynamic(() => import('@/app/components/loader'))
const loading = () => <Loader />
export default loading