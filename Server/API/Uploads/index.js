const express = require('express')
const mongoose = require('mongoose')
const multer  = require('multer')
const path = require('path')


// Database Models
const fileModel = require('../../Database/Models/Uploads')
const verifyUserToken = require('../../Config/index');

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
// Description : For Uploading a pdf

Router.post('/upload', upload.single('file'), async(req,res)=>{
    try {
         const title = req.body.title
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
    if(pdf_file) return res.send(pdf_file)
   
  } catch (error) {
    res.status(500).json({error:error.message})
  }
})

// Route  : '/allfiles'
// Method : GET
// Params : user_id
// Description : For Uploading a pdf

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