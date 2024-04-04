const fs = require('fs')
const {PDFDocument} = require('pdf-lib')
const path = require('path') 

module.exports =  async function getNewPdf(selectedPages,pathname){
    // Accessing the original pdf
 const originalPDF = fs.readFileSync(path.resolve(__dirname,`../API/Uploads/${pathname}`))

 // Saving the original pdf 
 const pdfDoc = await PDFDocument.load(originalPDF);

 // Creating a new empty pdf Document
 const newPDF = await PDFDocument.create()

 // Copying specified 'Page' Present in the original pdf to the newly created pdf document
 for (const page of selectedPages){
   if(page>=1 && page<= pdfDoc.getPageCount()){ 
     const {copiedPage} = newPDF.copyPages(pdfDoc,[page-1])
     newPDF.addPage(copiedPage)
   }

 }

 const edited_pdf = await newPDF.save()
 return edited_pdf
}


