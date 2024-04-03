const { string } = require('joi')
const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
    user : {type: mongoose.Types.ObjectId, ref: 'Users'},
    originalName: {type:String,required:true},
    file : {type:String,required:true},
    title : {type : String}
},{timestamps:true})

module.exports = mongoose.model("Uploads",fileSchema)