require('dotenv').config()
const jwt=require("jsonwebtoken")

exports.verifyToken=async(req,res,next)=>{
    const {token}=req.cookies
    try {
        const decodedUser=await jwt.verify(token,process.env.SECRET_KEY)
        if(decodedUser){
            req.user=decodedUser
            next()
        }
        else{
            return res.status(401).json({'message':'token expired'})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({'message':'please login again'})
    }
}