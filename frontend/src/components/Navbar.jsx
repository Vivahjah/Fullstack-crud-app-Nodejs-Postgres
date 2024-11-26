/* eslint-disable react/prop-types */


const Navbar = ({onOpen, setSerchTerm}) => {
    const handleChange = (e) => {
        setSerchTerm(e.target.value)

    }
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <a className="btn btn-ghost text-xl">Customers</a>
            </div>
            <div className="navbar-center">
                <div className="form-control">
                    <input onChange={handleChange} type="text" placeholder="Search" className="input input-bordered w-48 md:w-auto" />
                </div>
            </div>
            <div className="navbar-end">
                <a onClick={onOpen} className="btn btn-primary">Add Customers</a>
            </div>
        </div>
    )
}

export default Navbar