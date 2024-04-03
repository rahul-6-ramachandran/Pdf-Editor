
import { createContext, useContext, useState } from "react";


export const PdfContext = createContext()

export const PdfProvider = ({children})=>{

    const [pdf,setPDF] = useState()
    
    return <PdfContext.Provider  value={{pdf,setPDF}}>
        {children}
    </PdfContext.Provider>

}

export const usePDF = ()=>{
    const pdfContextValue = useContext(PdfContext)
    if(!pdfContextValue) throw new Error ("usePDF used outside the provider")
    return pdfContextValue
}