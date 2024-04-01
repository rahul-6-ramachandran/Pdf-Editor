const express = require('express')
const multer  = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: path.join(__dirname,'files/'),
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null, uniqueSuffix + file.originalname )
    }
  })
  
const upload = multer({ storage: storage })



const Router = express.Router()




Router.post('/upload', upload.single('file'),(req,res)=>{
    try {
         

    } catch (error) {
        console.log('Upload Failed')
    }
})


module.exports = Router