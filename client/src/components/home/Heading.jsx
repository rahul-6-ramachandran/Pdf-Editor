

function Heading() {
  return (
   <>
    <div className=' md:flex flex-col w-full lg:w-1/2 gap-3 justify-center text-center p-3 h-full'>
          <h1 className='flex items-center justify-center text-4xl lg:text-8xl text-gray-900 font-semibold '>Pee<span className="bg-sky-600 py-4 text-white rounded-xl px-2">DeeyeF</span></h1>
            <div className='md:flex text-center justify-center w-full'>
            <p className=' text-xl lg:text-2xl font-semibold text-gray-600'>Your Most Advanced and Simplest way to Extract PDF's</p>
            </div>
            <div className='md:flex text-center justify-center w-full'>
              <button className="m-2 w-1/2 transform ease-in-out rounded-full border-2 hover:bg-sky-600 hover:text-white border-sky-400 py-5 px-4">
                Login
              </button>
              <button className="m-2 w-1/2 rounded-full border-2 hover:bg-sky-600 hover:text-white border-sky-400 py-5 px-4">
                Signup
              </button>
            </div>
      
        </div>
   </>
  )
}

export default Heading