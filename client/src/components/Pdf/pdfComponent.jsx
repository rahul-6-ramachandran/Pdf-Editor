
import { useState } from 'react';
import axios from 'axios';
import { Document, Page } from 'react-pdf';
import { usePDF } from '../../store/pdf'
import { useNavigate } from 'react-router-dom';



function PdfComponent({ pdf_id, pdfUrl ,title}) {
    const [numPages, setNumPages] = useState();
    const [selectedPages, setSelectedPages] = useState([])
    const navigate = useNavigate()
    const {pdf_address,setNew,new_pdf} = usePDF()
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    const handlepageSelect = (pageNum, isChecked) => {

        // Conditionally stoting selected Page numbers 
        isChecked ? setSelectedPages((prev) => [...prev, pageNum]) : setSelectedPages((prev) => prev.filter((page) => page !== pageNum));
    }

    const getNewlyCreatedPdf = async () => {
        // const pathname = new URL(pdf).pathname
         await axios.post("http://localhost:3000/uploads/newpdf",
         { selectedPages, pdf_address }, 
         { 'responseType': 'blob' })
         .then(res=>{
            const url = URL.createObjectURL(res.data);
            setNew(url)
         })
         .then(()=> {
            navigate('/newpdf')
         }).catch(err=> console.log(err))
            
        


    }

    const handleSubmitPages = async()=>{
        getNewlyCreatedPdf()
       
    }
    return (
        <>
            <div className='flex flex-col relative h-screen md:w-full w-4/9'>


                <div className='flex flex-col relative  justify-center m-5 p-5 md:w-full w-full'>

                    <div className=' bg-gray-300 z-10 sticky top-0 md:w-full w-1/2 flex justify-center text-center items-center  p-3'>
                        <h2 className='w-full flex items-start text-xl justify-center items-center text-center text-gray-700 font-semibold'>{title}</h2>

                    </div>
                    <div className='w-1/9 md:w-full flex items-center justify-center'>

                        {/* Displaying All pages and corresponding checkbox using index*/}

                        <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
                            {Array.from(new Array(numPages), (el, index) => (
                                <div key={`page_${index + 1}`} className='flex flex-col w-full  gap-1 justify-center  z-10 items-center mx-2'>
                                    Page {index + 1} of {numPages}
                                    <Page pageNumber={index + 1} renderAnnotationLayer={false} renderTextLayer={false} />
                                    <label htmlFor="select" className='text-gray-700 hover bg-sky-400 hover:bg-sky-600 hover:text-gray-100 px-4 py-2 flex sticky bottom-2 justify-center rounded-lg w-1/9'>Select </label>
                                    <input type='checkbox' name="select" id='select' onChange={(e) => {
                                        console.log(index + 1)
                                        handlepageSelect(index + 1, e.target.checked)
                                    }} />
                                </div>
                            )
                            )}

                        </Document>
                    </div>


                </div>
                <div className='flex  md:w-full items-center text-center justify-center sticky bottom-2 z-10 bg-white md:p-2'>



                    <button type='submit' 
                    className='flex items-center justify-center text-center text-gray-700 hover bg-sky-400 hover:bg-sky-600 hover:text-gray-100 text-xl font-medium px-4 py-2 flex justify-center rounded-lg w-full'
                    onClick={handleSubmitPages}
                    >Generate Pdf</button>

                </div>

            </div>


        </>
    );
}

export default PdfComponent