
import { Route,Routes } from 'react-router-dom'


//Layouts import
import Homelayout from './Layout/homelayout'
import UploadsLayout from './Layout/uploadsLayout'

// Pages import
import Signin from './pages/Signin'
import SignUp from './pages/Signup'

function App() {


  return (
    <>
    <Routes>
    <Route exact path='/' element={<Homelayout/>}/>
    <Route exact path='/uploaded' element={<UploadsLayout/>}/>
    <Route exact path='/uploads/:name' element = {<UploadsLayout/>}/>
    <Route exact path='/signin' element={<Signin/>}/>
    <Route exact path='/signup' element={<SignUp/>}/>
  </Routes>

      
    </>
  )
}

export default App
