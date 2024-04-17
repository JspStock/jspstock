import dynamic from "next/dynamic";

const Loader = () => {
    return <div className="grid lg:grid-cols-3 md:grid-cols-2 max-md:grid-cols-1 gap-5">
        {
            Array.from({ length: 11 }).map((_, index) => <div className="card bg-white" key={index}>
                <div className="card-body">
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-2/4"></div>
                <div className="skeleton h-4 w-2/4"></div>
                </div>
            </div>)
        }
    </div>
}

export default Loader