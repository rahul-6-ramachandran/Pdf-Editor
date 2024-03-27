import { useState } from 'react'
import Homelayout from './Layout/homelayout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='flex justify-center h-full'>
    <Homelayout/>
    </div>

      
    </>
  )
}

export default App
