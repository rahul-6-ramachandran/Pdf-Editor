
import { createContext, useContext, useState } from "react";
import axios from "axios";
import { saveAs } from 'file-saver'


export const PdfContext = createContext()

export const PdfProvider = ({ children }) => {

    const [file,setFile] = useState('')
    // pdf object id storing state
    const [pdf, setPDF] = useState()

    // pdf url address storing state
    const [pdf_address, setPdf_Address] = useState()

    // newly created pdf State
    const [new_pdf, setNew] = useState()

    const getpdf_url = (pdf_url) => {
        setPdf_Address(pdf_url)
    }

    


    return <PdfContext.Provider value={{ pdf, setPDF, getpdf_url, pdf_address, new_pdf ,setNew,setFile,file}}>
        {children}
    </PdfContext.Provider>

}

export const usePDF = () => {
    const pdfContextValue = useContext(PdfContext)
    if (!pdfContextValue) throw new Error("usePDF used outside the provider")
    return pdfContextValue
}