const express = require('express')
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

Router.post('/upload',verifyUserToken, upload.single('file'), async(req,res)=>{
    try {
         const title = req.body.title
         const file = req.file.filename
         await fileModel.create({title,file,user:req.user._id})
        res.status(200).json({status:"Storing Success"})
    } catch (error) {
        res.status(500).json({error:error.message})
}})


// Route  : '/allfiles'
// Method : GET
// Params : None
// Description : For Uploading a pdf

Router.get('/upload/:title',verifyUserToken,async(req,res)=>{
    try {
        // await fileModel.find({title:})
    } catch (error) {
        
    }
})

module.exports = Router