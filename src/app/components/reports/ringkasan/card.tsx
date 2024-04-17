const Card = ({ title, content }: {
    title: string,
    content: Array<{ key?: string, value?: string, divider?: boolean }>,
}) => {
    return <div className="card bg-white">
        <div className="card-body">
            <h1 className="card-title">{title}</h1>
            {
                content.map((e, index) => e.divider == undefined || e.divider == false ? <div className="flex justify-between items-center" key={index}>
                <h1>{e.key}</h1>
                <h1>{e.value}</h1>
            </div> : <div className="divider" key={index}></div> )
            }
        </div>
    </div>
}

export default Card