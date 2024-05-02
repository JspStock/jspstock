import { Metadata } from "next"
import Logo from '@/assets/images/logo.png'
import Image from "next/image"
import { getPackage } from "./action"
import { $Enums } from "@prisma/client"
import dynamic from "next/dynamic"

export interface Params {
    package: string
}

export const metadata: Metadata = {
    title: 'Konfirmasi Paket'
}

const ConfirmButton = dynamic(() => import('@/app/components/package/[package]/confirmButton'))

const page = async ({ params }: { params: Params }) => {
    const packages = await getPackage(params.package)

    return <div className="w-full h-screen flex justify-center items-center bg-gray-200">
        <div className="bg-white p-6 rounded w-full mx-6 min-h-[calc(100vh-50px)] md:w-5/12">
            {
                packages ? <section>
                    <div className="flex justify-center w-10/12 mx-auto mt-5 md:w-7/12">
                        <Image
                            src={Logo}
                            sizes="100vw"
                            width={0}
                            height={0}
                            className="w-full h-auto"
                            alt="Logo" />
                    </div>

                    <h1 className="text-2xl font-semibold text-center mt-5">Nomor resi : <br />{packages.id}</h1>
                    <p dangerouslySetInnerHTML={{ __html: packages.address.replaceAll('\n', "<br />") }} className="mt-5"></p>

                    <div className="flex justify-center mt-5">
                        {
                            packages.status == $Enums.PackagingStatus.PICKUP ? <ConfirmButton id={packages.id} /> : <h1 className="text-xl font-semibold text-center text-blue-900">Paket telat sampai ditujuan</h1>
                        }
                        
                    </div>
                </section> : <h1 className="text-center font-semibold text-4xl">Maaf, nomor resi paket tidak terdaftar!</h1>
            }

        </div>
    </div>
}

export default page