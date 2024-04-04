import axios from 'axios'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"

// Components
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PdfErrorBox from '../Error/pdfError';
import { usePDF } from '../../store/pdf';



const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
 
  width: 1,
  color:'black'
});

function Upload() {
  const [title, setTitle] = useState()
  const [file,setFile] = useState('')
  const [error,setError] = useState(false)

  const navigate = useNavigate()
  const {setPDF} = usePDF()

  const handleChange = (e) => {
    setTitle(e.target.value )
  }
  const handleChangeFile = (e) => {
    setFile(() => (e.target.files[0]))
    document.getElementsByClassName("pdfname").innerHTML = e.target.files[0].originalName
  }

  const submit = async(e) => {

   
    e.preventDefault()
    
  
    const formData = new FormData()
    formData.append("title",title)
    formData.append("file",file)
    // console.log(title,file)

    if(file.type!= "application/pdf"){
     
      setError((prev)=>!prev);
      return false 
      
    }
      
    

    const result = await axios.post("http://localhost:3000/uploads/upload",
    formData,
    {headers:{"Content-Type":"multipart/formData"}})
    if(result) {
      // console.log(result.data.object_id)
      console.log("Successfully Uploaded")

      // Storing object id of the current pdf from url
      setPDF(result.data.object_id)   

      // navigating to the uploaded pdf using object id
      navigate(`/uploads/${result.data.object_id}`)
      
    }
    setTitle('')
   setFile('')
  }
  return (
    <div className=' md:flex flex-col w-full lg:w-1/2 gap-3 justify-center text-center p-3 '>

      <div className=' w-full text-start flex flex-col justify-center items-center gap-3'>
        <form
          method="POST"
          onSubmit={submit}
          className='text-start w-full flex flex-col justify-center items-center gap-2'
          encType="multipart/form-data" 
          >
          <div className="flex flex-col gap-2 w-2/3 p-4">

          </div>
          <div className="flex flex-col gap-2 w-2/3 p-4 ">
            <label className="text-2xl text-gray-600" htmlFor="title">Title of the pdf </label>
            <input required className="focus:outline-sky-500 focus:outline-5 border-2 px-2 py-2 border-blue-500/50 rounded-lg"
              type="text"
              id="title"
              name="title"
              value={title || ''}
              onChange={handleChange}
            />
          </div>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload files
            <VisuallyHiddenInput type="file"  required accept="application/pdf" id="file" onChange={handleChangeFile} />
            <div className="pdfname"></div>
          </Button>
      
          <PdfErrorBox  isOpen={error} setIsOpen={setError}/>
         
          <button type='submit' className="m-2 rounded-full border-2 hover:bg-sky-600 hover:text-white border-sky-400 py-1 px-4" >Submit</button>
        
        </form>

      </div>

    </div>
  )
}

export default Upload