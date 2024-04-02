const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Database imports
const userModel = require('../../Database/Models/Auth')

// Validation imports
const validateUser = require('../../Validation/Auth')


const Router = express.Router()


// Route  : '/signup'
// Method : POST
// Params : None
// Description : For User Signup

Router.post('/signup', async (req, res) => {
    try {

        // User Credentials Validation
        
        await validateUser(req.body.credentials)

        // Checking if the user already exists
      
        const user = await userModel.findOne({ Email: req.body.credentials.Email })
        if (!user){
            // Creating new User

            const newUser = await userModel.create(req.body.credentials)
            const token = jwt.sign({id:newUser._id.toString()},process.env.JWT_SECRET)
            res.status(200).json({ token,newUser })
        
        } else {
            res.status(500).json("User already exists")
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
})


// Route  : '/signin'
// Method : POST
// Params : None
// Description : For User Signup

Router.post('/signin', async (req, res) => {
    try {
        // User credentials Validation
        await validateUser(req.body.credentials)

        // Retrieving user with Email
        const user = await userModel.findOne({ Email: req.body.credentials.Email })
        const token = jwt.sign({id:user._id.toString()},process.env.JWT_SECRET)
        res.status(200).json({ token,user })
    
        if (user) {
            // Password Verification
            const doesPasswordMatch = bcrypt.compare(req.body.credentials.Password, user.Password)
            if (!doesPasswordMatch) {
                console.log("Invalid password")
            }
        }else res.status(200).json({ status: "Login Successfull" })

        
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
)


module.exports = Router