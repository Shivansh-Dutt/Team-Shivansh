import jwt from "jsonwebtoken"
import dotenv from "dotenv"

const isAuthentiacted = async (req,res,next)=>{
    try {
        dotenv.config()

        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message : "User not authenticated",
                success : false
            });
        }
        const decode = await jwt.verify(token,process.env.SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                message : "Invalid",
                success : false
            });
        }
        req.id = decode.userID;
        next()
    } catch (error) {
        console.log(error)
    }
}

export default isAuthentiacted;