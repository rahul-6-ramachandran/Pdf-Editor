const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
    user : {type: mongoose.Types.ObjectId, ref: 'Users'},
    pdf_files: [{type:String,required:true}]
},{timestamps:true})

module.exports = mongoose.model("Uploads",fileSchema)