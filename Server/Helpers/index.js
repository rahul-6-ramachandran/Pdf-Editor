const fs = require('fs')
const {PDFDocument} = require('pdf-lib')
const path = require('path') 




module.exports =  async function getNewPdf(selectedPages,pathname){
    // Accessing the original pdf
try {
  console.log( )
  const filename =  path.resolve(__dirname,`.././API/Uploads/${pathname}`)
  console.log(filename)
 
const originalPDF =  fs.readFileSync(filename)
console.log(originalPDF)

// Saving the original pdf 
const pdfDoc = await PDFDocument.load(originalPDF);

// Creating a new empty pdf Document
const newPDF = await PDFDocument.create()

// Copying specified 'Page' Present in the original pdf to the newly created pdf document
for (const page of selectedPages){

   const {copiedPage} = newPDF.copyPages(pdfDoc,[page-1])
   newPDF.addPage(copiedPage)
 

}

const edited_pdf = await newPDF.save()
//  console.log(edited_pdf)
return edited_pdf
  
} catch (error) {
  console.log(error)
}
  
}


