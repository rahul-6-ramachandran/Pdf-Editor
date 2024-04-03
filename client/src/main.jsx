import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './store/auth.jsx'
import { PdfProvider } from './store/pdf.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <React.StrictMode>
      <PdfProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        </PdfProvider>
    </React.StrictMode>
  </AuthProvider>
)
