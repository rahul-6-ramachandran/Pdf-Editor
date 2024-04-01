import { useState } from "react"
import { Link } from "react-router-dom"


function Signin() {
    const [userDetails,setUserDetails] = useState({
        Email : "",
        Password : ""
    })
    const handleChange = (e)=>{
        setUserDetails((prev)=>({...prev,[e.target.id]:e.target.value}))
    }
    
    const submit = (e)=>{
        e.preventDefault();

    }
  return (
    <>
    <div className=' lg:flex w-full items-center lg:h-screen justify-center  gap-5 md:p-4 p-1'>
    <div className=' w-2/5 text-start flex flex-col justify-center items-center gap-3'>
        <form
          method="POST"
          onSubmit={submit}
          className='text-start w-full flex flex-col justify-center items-center gap-2'
          encType="multipart/form-data" 
          >
          <div className="flex flex-col gap-2 w-2/3 p-4">
          <label className="text-2xl text-gray-600" htmlFor="Email">Email Address</label>

          <input required className="focus:outline-sky-500 focus:outline-5 border-2 px-2 py-2 border-blue-500/50 rounded-lg"
            placeholder="Enter a valid Email"
              type="email"
              id="Email"
              name="Email"
              value={userDetails.Email}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2 w-2/3 p-4 ">
            <label className="text-2xl text-gray-600" htmlFor="Password">Password</label>
            <input required className="focus:outline-sky-500 focus:outline-5 border-2 px-2 py-2 border-blue-500/50 rounded-lg"
              type="Password"
              id="Password"
              name="Password"
              value={userDetails.Password}
              onChange={handleChange}
            />
          </div>
          <Link to={'/'}>
          <button className="m-2 rounded-full border-2 hover:bg-sky-600 hover:text-white border-sky-400 py-1 px-4" >Submit</button>
          </Link>
          <Link to={'/signup'} className="underline hover:text-lg">I don't have an account</Link>
          <p className="text-gray-600">Login for Accessing the PDF files you have uploaded and edited earlier</p>

        </form>

      </div>
      </div>

    </>
  )
}

export default Signin