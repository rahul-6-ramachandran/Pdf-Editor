const express = require('express')
const multer  = require('multer')
const path = require('path')

// Database Models
const fileModel = require('../../Database/Models/Uploads')

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
         await fileModel.create({title,file})
        res.status(200).json({status:"Storing Success"})
    } catch (error) {
        res.status(500).json({error:error.message})
}})


module.exports = Router