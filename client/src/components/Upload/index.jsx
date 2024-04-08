import axios from "axios"
import { useEffect, useState } from "react"
import { usePDF } from "../../store/pdf"
import { pdfjs } from 'react-pdf';
import PdfComponent from "../Pdf/pdfComponent";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

function UploadsPage() {
  // const [currentPDF, setCurrentPDF] = useState()
  const [title,setTitle] = useState('')
  const { pdf,getpdf_url,pdf_address,file } = usePDF()

  useEffect(() => { getPDF() }, [])

  const getPDF = async () => {
    console.log(pdf)
    axios.get(`http://localhost:3000/uploads/upload/${pdf}`)
    .then((result) => {
      // console.log(result.data)
      getpdf_url(`http://localhost:3000/files/${result.data.file.toString()}`)
      setTitle(result.data.title)
    })
    .catch (err => err.response.data)
    // console.log(currentPDF)
   
  }


return (
  <>


    <div className="flex justify-center text-2">
      <div>
      <PdfComponent pdf_id={file} pdfUrl={pdf_address} title={title}/>
      </div>
    </div>
  </>

)
}

export default UploadsPage