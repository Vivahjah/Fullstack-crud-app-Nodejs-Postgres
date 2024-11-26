/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"



const ModalForm = ({ modalMode, isOpen, onClose, onSubmit, customerData }) => {
    const [name, setName] = useState("")
    const [rate, setRate] = useState("")
    const [email, setEmail] = useState("")
    const [job, setJob] = useState("")
    const [status, setStatus] = useState(false)

    const resetForm = () => {
        setEmail("")
        setRate("")
        setName("")
        setJob("")
        setStatus(false)

    }


    const handleStatusChange = (e) => {

        setStatus(e.target.value === "Active")
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const customerData = { name, email, rate: Number(rate), job, status }
            onSubmit(customerData)

        } catch (error) {
            console.log(error.message);
        }
        onClose()
        resetForm()
    }

    useEffect(() => {
        if (modalMode === "edit" && customerData) {
            console.log(customerData, "from Modal");
            setEmail(customerData?.email)
            setRate(customerData?.rate)
            setName(customerData?.name)
            setJob(customerData?.job)
            setStatus(customerData?.status)
        }
        else {
            resetForm()
        }

    }, [modalMode, customerData])


    return (
        <div>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            {/* <button className="btn" onClick={() => document.getElementById('my_modal_3').showModal()}>open modal</button> */}
            <dialog id="my_modal_3" className="modal" open={isOpen}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg py-4">{modalMode === "edit" ? "Edit Customers" : "New Customers"}</h3>
                    <form method="dialog" onSubmit={handleSubmit}>
                        {/* if there is a button in form, it will close the modal */}
                        <label className="input input-bordered flex my-4 items-center gap-2">
                            Name
                            <input type="text" className="grow" value={name} onChange={(e) => setName(e.target.value)} />
                        </label>
                        <label className="input input-bordered flex my-4 items-center gap-2">
                            Email
                            <input type="text" className="grow" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </label>
                        <label className="input input-bordered flex my-4 items-center gap-2">
                            Job
                            <input type="text" className="grow" value={job} onChange={(e) => setJob(e.target.value)} />
                        </label>
                        <div className="flex mb-4 gap-x-4 justify-between">
                            <label className="input input-bordered flex items-center gap-2">
                                Rate
                                <input type="number" className="grow" value={rate} onChange={(e) => setRate(e.target.value)} />
                            </label>
                            <select value={status ? "Active" : "Inactive"} className="select select-bordered w-full max-w-xs" onChange={handleStatusChange}>
                                <option>Active</option>
                                <option>Inactive</option>
                            </select>

                        </div>
                        <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        <button type="submit" className="btn btn-success mt-5">{modalMode === "edit" ? "Save Changes" : "Add Customer"}</button>
                    </form>
                </div>
            </dialog>
        </div>
    )
}

export default ModalForm

