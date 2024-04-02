const jwt = require('jsonwebtoken')

const verifyUserToken = (req,res,next)=>{
    const token = req.headers["authorization"]
    if(token == undefined){
        res.status(401).send({error: "Token Validation failed"})
    }
    jwt.verify(token.split(" ")[1],process.env.JWT_SECRET,(err,decoded)=>{
        if(err) res.status(500).json({error:"Authentication failed"})
        else req.user = decoded
        next()
    })
    } 

module.exports = verifyUserToken