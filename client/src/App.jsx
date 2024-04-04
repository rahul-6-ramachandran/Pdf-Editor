
import { Route,Routes } from 'react-router-dom'


//Layouts import
import Homelayout from './Layout/homelayout'
import UploadsLayout from './Layout/uploadsLayout'

// Pages import
import Signin from './pages/Signin'
import SignUp from './pages/Signup'
import AllUploads from './components/Upload/AllUploads'
import NewPdf from './components/Upload/Newpdf'


function App() {


  return (
    <>
    <Routes>
    <Route exact path='/' element={<Homelayout/>}/>
    <Route exact path='/uploaded' element={<UploadsLayout/>}/>
    <Route exact path='/uploads/:name' element = {<UploadsLayout/>}/>
    <Route exact path= '/uploads' element = {<AllUploads/>}/>
    <Route exact path='/signin' element={<Signin/>}/>
    <Route exact path='/signup' element={<SignUp/>}/>
    <Route exact path='/newpdf' element={<NewPdf/>}/>
  </Routes>

      
    </>
  )
}

export default App
