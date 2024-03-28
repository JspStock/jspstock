const Perpage = () => {
    return (
        <div className="flex items-center mt-3">
            <div className="dropdown">
                <div tabIndex={0} role="button" className="btn m-1">10</div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 bg-base-100 rounded-box w-52 shadow-xl">
                    <li><button>10</button></li>
                    <li><button>50</button></li>
                    <li><button>ALL</button></li>
                </ul>
            </div>
            <h1>Per halaman</h1>
        </div>
    )
}
export default Perpage