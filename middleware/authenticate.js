
const jwt=require("jsonwebtoken")
const authenticate=(req,res,next)=>{
    try{
        const token=req.headers.authorization||" ";
        if(token){
            let decoded=jwt.verify(token,"masai")
               if(decoded){
                req.body.userId=decoded.userId;
                next()
               }
               else{
                res.send("Login again")
               }
        }
        else{
            res.send("token not found")
        }
    }
    catch(error){
        res.send(error.message)
        res.send("Please Login First")
    }
}
module.exports={authenticate}