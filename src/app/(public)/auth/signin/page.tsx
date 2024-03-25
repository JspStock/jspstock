import { Metadata } from "next"
import dynamic from "next/dynamic"

const Form = dynamic(() => import('@/app/components/auth/signin/form'))

export const metadata: Metadata = {
    title: "Masuk akun"
}

const page = () => {
    return <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
                <h1 className="text-5xl font-bold">Masuk sekarang!</h1>
                <p className="py-6">Ayo optimalkan toko Anda! Dapatkan akses ke alat manajemen dengan masuk sekarang. Mari ubah cara Anda menjalankan toko!</p>
            </div>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <Form />
            </div>
        </div>
    </div>
}

export default page