import Image from "next/image"

const Loader = () => {
    return <div className="absolute top-2/4 left-2/4 transform -translate-y-2/4 -translate-x-2/4">
        <div className="flex max-w-fit flex-col items-center">
            <Image
                width={150}
                height={150}
                src={"/static/images/icon.jpg"}
                alt="JSP Logo" />

            <h1>Sedang mengambil data...</h1>
        </div>
    </div>
}

export default Loader