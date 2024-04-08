const express = require('express')
const mongoose = require('mongoose')
const multer  = require('multer')
const {Readable} = require('stream')
const fs = require('fs')
const path = require('path')


// Database Models
const fileModel = require('../../Database/Models/Uploads')
const verifyUserToken = require('../../Config/index');
const getNewPdf = require('../../Helpers/index')

// Multer Setup
const storage = multer.diskStorage({
    destination: path.join(__dirname,'files/'),
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null, uniqueSuffix + file.originalname )
    }
  })
  
const upload = multer({ storage: storage })



const Router = express.Router()


// Route  : '/upload'
// Method : POST
// Params : None
// Description : Uploading a new pdf to the server and storing in the database

Router.post('/upload', upload.single('file'), async(req,res)=>{
    try {
        //  const {title} = 
         const {title}= req.body
         const file = req.file.filename
         const originalName = req.file.originalname
         const result = await fileModel.create({title,file,originalName})
         return res.status(200).json({object_id:result._id.toString(), status:"Storing Success"})
    } catch (error) {
        res.status(500).json({error:error.message})
}})


// Route  : '/upload'
// Method : GET
// Params : id
// Description : For displaying an uploaded pdf 

Router.get('/upload/:id',async(req,res)=>{
  try {
    const objectId = req.params.id
    const objID = new mongoose.Types.ObjectId(objectId)
    // console.log(objID)
    const pdf_file = await fileModel.findById(objID)
    if(pdf_file) return res.status(200).send(pdf_file)
  } catch (error) {
    res.status(500).json({error:error.message})
  }
})

// Route  : '/upload'
// Method : POST
// Params : None
// Description : For getting new pdf from the existing pdf with specific page numbers

Router.post('/newpdf',async(req,res)=>{
  try {
    // Retrieving selected pages sent from the frontend
    const {selectedPages,pdf_address} = req.body
    console.log(selectedPages,req.body)
    const pathname = new URL(pdf_address).pathname
    const decodedPath = decodeURIComponent(pathname)

      console.log(decodedPath)
      const newly_generated_pdf = await getNewPdf(selectedPages,decodedPath )
    
      if(newly_generated_pdf){
        console.log(newly_generated_pdf)
        res.setHeader('Content-Type','application/pdf')
        // res.setHeader('Content-Disposition', 'attachment; filename="filename.pdf"')
        const pdfStream = new Readable();
        // await fs.writeFile(newly_generated_pdf).then((data)=>console.log(data));
  
       
        pdfStream._read = () => { };
        pdfStream.push(newly_generated_pdf)
        
        pdfStream.push(null); // Signals the end of the stream
        pdfStream.pipe(res);
      }else{
        res.status(500).json({Statue:"failure"})
      }
   



   
  } catch (error) {
    res.status(500).json({error:error.message})
  }
})




// Route  : '/allfiles'
// Method : GET
// Params : user_id
// Description : For Retrieving all pdf's uploaded by a particular user

Router.get('/uploads/:user_id',verifyUserToken,async(req,res)=>{
    try {
        const {user_id} = req.params
        
            const allfiles = await fileModel.findById({user:JSON.stringify(user_id)})
         console.log(allfiles)
    } catch (error) {
      res.status(500).json({error:error.message})
    }
})

module.exports = Router