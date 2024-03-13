import React, { ReactNode } from "react"
import Image from "next/image"

const CardDash = ({ image, title, value }: { image: string, title: ReactNode, value: string }) => {
    return (
        <div className="p-10 max-w-sm flex justify-between rounded-md bg-white">
            <div className="text-gray-900">
                <h1 className="text-gray-900 text-sm">{title}</h1>
                <p className="text-gray-900 text-xl font-bold">Rp.{value}</p>
            </div>
            <div className="p-3 w-12 rounded-md bg-blue-900">
                <Image
                    alt="Image"
                    src={image}
                    width={100}
                    height={100}
                />
            </div>
        </div>
    )
}
export default CardDash