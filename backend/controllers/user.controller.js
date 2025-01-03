import User from "../models/user.model.js";

export const register = async (req,res) =>{
    console.log("Request Body")
    try {
        // destructure username ,email ,password

        const {name,email,password} = req.body

        if(!name || !email || !password){
            return res.status(401).json({
                message:"Fill all Data",
                success: false
            })
        }

    } catch (error) {
        console.log(error)
    }
}