import axios from "axios"
import { useEffect } from "react"
import { usePDF } from "../../store/pdf"


function UploadsPage() {
  
  const {pdf} = usePDF()
  
  useEffect(()=> {getPDF()},[])
  const getPDF = async()=>{
    console.log(pdf)
      axios.get(`http://localhost:3000/uploads/upload/${pdf}`).then((result)=>  console.log(result)).catch(err => err.response.data)
   
  }
  
  
  return (
    <>
    
    
    <div className="flex justify-center text-2">
        
    </div>
    </>
  
  )
}

export default UploadsPage