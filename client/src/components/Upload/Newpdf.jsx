import { useState } from 'react';
import { pdfjs } from 'react-pdf';
import { Document, Page } from 'react-pdf';
import { usePDF } from '../../store/pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();



export default function NewPdf() {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
    const {new_pdf} = usePDF()
    console.log(new_pdf)
  function onDocumentLoadSuccess({ numPages }){
    setNumPages(numPages);
  }

  return (
    <div>
      <Document file={new_pdf} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
}