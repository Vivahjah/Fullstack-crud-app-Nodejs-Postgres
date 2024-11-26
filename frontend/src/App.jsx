
import { useEffect, useState } from 'react'
import './App.css'
import ModalForm from './components/ModalForm'
import Navbar from './components/Navbar'
import TableList from './components/TableList'
import axios from 'axios'
// import axios from 'axios'

function App() {

  const [isOpen, setIsOpen] = useState(false)
  const [modalMode, setModalMode] = useState("edit")
  const [searchTerm, setSerchTerm] = useState("")
  const [customerData, setCustomerData] = useState(null)
  const [tableData, setTableData] = useState([])
  const [error, setError] = useState(null)


  useEffect(() => {

    const fetchData = async() => {
        setError(null)
        try {
            const res = await axios.get("http://localhost:3000/api/customers");
            console.log(res);
            setTableData(res.data)

            
        } catch (error) {
            console.log(error);
            setError(error.message)
            
        }
    }
    fetchData()
 
}, [])



  const handleOpen = (mode, customer) => {
    setCustomerData(customer)
    setIsOpen(true)
    setModalMode(mode)
  }


  const handleSubmit = async(newCustomerData) => {
    if (modalMode === "add") {
      try {
        const res = await axios.post(`http://localhost:3000/api/customers/`, newCustomerData);
        setTableData((prev) => [...prev, res.data ])
        console.log(res.data);
        
      } catch (error) {
        console.log(error.message);
        
      }
     
    }
    else {
      console.log("Modal mode Edit")
      try {
        const res = await axios.put(`http://localhost:3000/api/customers/${customerData?.id}`, newCustomerData);
        console.log(res.data);
        setTableData((prev) => 
          prev.map((customer) => 
            customer.id === res.data.id ? res.data : customer
          )
        );
        
      } catch (error) {
        console.log(error.message);
        
      }

    }
  }


  return (
    <div>
      <Navbar onOpen={() => handleOpen("add")} setSerchTerm={setSerchTerm} />
      <TableList handleOpen={handleOpen} searchTerm={searchTerm} tableData={tableData} setTableData={setTableData} error={error}/>
       <ModalForm isOpen={isOpen} onClose={() => setIsOpen(false)} onSubmit={handleSubmit} customerData={customerData}  modalMode={modalMode}  />
    </div>
  )
}

export default App
