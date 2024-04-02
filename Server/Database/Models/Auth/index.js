const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    Email : {
        type : String,
        required : true
    },
    Password : {
        type : String,
        required :true
    }
})

// userSchema.statics.findByEmail = async({Email})=>{
//     // console.log("Email successful")
//     const user = await userModel.findOne({Email})
//     if(user)  throw new Error("User Already Exist")
//     return false
// }

userSchema.pre("save",function(next){
    const user = this
    if(!user.isModified("Password")) return next()
    bcrypt.genSalt(8,(error,salt)=>{
        if(error) return next(error)
        bcrypt.hash(user.Password,salt,(error,hash)=>{
            if(error) return next(error)
            user.Password = hash
        return next()
    })
        })
})



module.exports = mongoose.model("Users",userSchema)