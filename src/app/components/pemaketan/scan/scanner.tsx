"use client"

import { checkStatus, updateStatus } from "@/app/(public)/(main)/pemaketan/scan/action"
import { errorAlert } from "@/utils/alert/swal"
import { useState } from "react"
import { useZxing } from "react-zxing"
import useSound from "use-sound"

const Scanner = () => {
    const [play] = useSound("/static/sounds/scan-detect.mp3")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [message, setMessage] = useState<string>("")
    const {ref} = useZxing({
        onDecodeResult: async result => {
            play()
            setIsLoading(true)
            const splitUrl = result.getText().split("/")
            const getPackageId = splitUrl[splitUrl.length - 1]

            try{
                const check = await checkStatus(getPackageId)
                if(check){
                    if(check.status == "MENUNGGU_KURIR"){
                        await updateStatus(getPackageId)
                        setMessage("Status paket diperbarui")
                    }else if(check.status == "PICKUP"){
                        setMessage("Paket sudah di Pickup")
                    }else{
                        setMessage("Paket sudah terkirim")
                    }
                }else{
                    setMessage("Kode paket tidak ditemukan!")
                }

                setIsLoading(false)
            }catch{
                errorAlert(() => setIsLoading(false))
            }
        }
    })

    return <div className="space-y-2">
        <video className="rounded-box" ref={ref} />
        <p className="text-center font-semibold">
            { isLoading ? <div className="loading"></div> : message }
        </p>
    </div>
}

export default Scanner