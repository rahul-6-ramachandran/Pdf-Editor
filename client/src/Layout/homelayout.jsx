// Components
import Heading from "../components/home/Heading"
import Upload from "../components/home/Upload"


function Homelayout() {
 
  return (
    <>
      <div className=' lg:flex w-full items-center lg:h-screen justify-center  gap-5 md:p-4 p-1'>
        <Heading />
        <Upload/>

      </div>
    </>
  )
}

export default Homelayout