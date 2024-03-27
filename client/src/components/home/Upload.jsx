
import { useState } from "react";

// Components
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function Upload() {
  const [userData, setUserData] = useState({
    username: "",
    title: ""
  })
  const [file,setFile] = useState('')

  const handleChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }
  const handleChangeFile = (e) => {
    setFile(() => (e.target.files[0]))
    document.getElementsByClassName("pdfname").innerHTML = e.target.files[0]
  }

  const submit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("userData",userData)
    formData.append("file",file)
    console.log(userData,file)
  
    // setUserData({
    //   username: "",
    //   title: "",
    //   file: ""

    // })
  }
  return (
    <div className=' md:flex flex-col w-full lg:w-1/2 gap-3 justify-center text-center p-3 '>

      <div className=' w-full text-start flex flex-col justify-center items-center gap-3'>
        <form
          onSubmit={submit}
          className='text-start w-full flex flex-col justify-center items-center gap-2'>
          <div className="flex flex-col gap-2 w-2/3 p-4">
            <label className="text-justify text-2xl text-gray-600" htmlFor="username">Enter your name</label>
            <input required className="focus:outline-sky-500 focus:outline-5 w-full  border-2 px-2 py-2 border-blue-500/50 rounded-lg"
              type="text"
              id="username"
              name="username"
              value={userData.username}
              onChange={handleChange}
            />

          </div>
          <div className="flex flex-col gap-2 w-2/3 p-4 ">
            <label className="text-2xl text-gray-600" htmlFor="title">Title of the pdf </label>
            <input required className="focus:outline-sky-500 focus:outline-5 border-2 px-2 py-2 border-blue-500/50 rounded-lg"
              type="text"
              id="title"
              name="title"
              value={userData.title}
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
            <VisuallyHiddenInput type="file" required accept="application/pdf" id="file" onChange={handleChangeFile} />
            <div className="pdfname"></div>
          </Button>
          <button className="m-2 rounded-full border-2 hover:bg-sky-600 hover:text-white border-sky-400 py-1 px-4" >Submit</button>
        </form>

      </div>

    </div>
  )
}

export default Upload