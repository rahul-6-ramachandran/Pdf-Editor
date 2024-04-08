
import { pdfjs } from 'react-pdf';

import { usePDF } from '../../store/pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();



export default function NewPdf() {
 
    const {new_pdf} = usePDF()
    console.log(new_pdf)
  

  return (
    <div>
       <iframe
        style={{ display: "block", width: "100vw", height: "90vh" }}
        title="PdfFrame"
        src={new_pdf}
        type="application/pdf"
      ></iframe>
      <p>
      </p>
    </div>
  );
}