const Form = () => {
    return <form className="card-body">
        <div className="form-control">
            <label className="label">
                <span className="label-text">username</span>
            </label>
            <input type="text" placeholder="Username" className="input input-bordered" required />
        </div>
        <div className="form-control">
            <label className="label">
                <span className="label-text">Password</span>
            </label>
            <input type="password" placeholder="Password" className="input input-bordered" required />
        </div>

        <div className="form-control mt-6">
            <button className="btn rounded-box bg-blue-950 text-white">Login</button>
        </div>
    </form>
}

export default Form