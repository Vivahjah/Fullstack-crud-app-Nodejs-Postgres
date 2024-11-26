/* eslint-disable react/prop-types */
import axios from "axios"
import { useState, useEffect } from "react";

const TableList = ({handleOpen, searchTerm, tableData, setTableData}) => {
 
    const [error, setError] = useState(null)


  

    useEffect(() => {
        const searchCustomer = async() => {
            setError(null)
            try {
                const res = await axios.get(`http://localhost:3000/api/customers/search?term=${searchTerm}`);
                console.log(res);
                setTableData(res.data)

                
            } catch (error) {
                console.log(error);
                setError(error.message)
                
            }
        }
        searchCustomer()
    }, [searchTerm,setTableData])

    const handleDelete = async(id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this Customer")
        if(confirmDelete){
            try {
                const res = await axios.delete(`http://localhost:3000/api/customers/${id}`);
                setTableData((prev) => prev.filter(c => c.id !== id))
                console.log(res.data);
                
              } catch (error) {
                console.log(error.message);
                
              }
        }
    }
    
    


    
    return (
        <div>
            {error && <div className="alert alert-error">{error}</div>}
            <div className="overflow-x-hidden mt-10 ml-5">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Job</th>
                            <th>Rate</th>
                            <th>Status</th>
                            
                        </tr>
                    </thead>
                    <tbody className="hover">

                        
                        {tableData.map((customer, index) => (
                        <tr key={index}>
                            <th>{index + 1}</th>
                            <td>{customer.name}</td>
                            <td>{customer.email}</td>
                            <td>{customer.job}</td>
                            <td>{customer.rate}</td>
                            <td>
                                <button className={`btn rounded-full w-20 ${customer.status ? "btn-primary" : "btn-outline btn-primary"}`}>{customer.isActive ? "Active" : "Inactive"}</button>
                            </td>
                            <td><button onClick={() => handleOpen("edit", customer)} className=" btn btn-accent">Update</button></td>
                            <td><button onClick={() => handleDelete(customer?.id)} className="btn btn-error">Delete</button></td>
                           
                        </tr>

                        ))}
     
                      
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TableList