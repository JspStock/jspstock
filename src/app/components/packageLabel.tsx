import QRCode from "react-qr-code"

const PackageLabel = ({ content, linkQr }: {
    content: string,
    linkQr: string
}) => {
    return <div className="w-[377.952px] h-[566.92px] bg-white relative border">
        <h1 className="text-5xl font-semibold text-center mt-5">JSP</h1>
        <p className="text-center text-xl mt-5">No HP: 081384734233</p>
        <div className="divider divide-gray-950"></div>
        <p className="px-6 line-clamp-[10]" dangerouslySetInnerHTML={{
            __html: content.replaceAll("\n", "<br />")
        }}></p>

        <QRCode
            value={linkQr}
            className="bottom-0 mb-16 absolute left-2/4 transform -translate-x-2/4"
            size={70} />
        <p className="text-xl font-semibold absolute bottom-0 left-2/4 transform -translate-x-2/4 mb-5 mr-5">Thx For Shopping</p>
    </div>
}

export default PackageLabel