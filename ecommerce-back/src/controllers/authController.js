import User from "../models/User.js"
import { getProfileService, loginUserService, registerUserService } from "../services/authService.js"

export const registerUser = async (req,res) => {
    
    const userData = req.body

    try{
        const response = await registerUserService(userData)
        res.json({
            success:true,
            data:response,
            message:"User registered successfully!"
        })
    }catch(err)
    {
        res.status(400).json({
            message:err.message
        })
    }
}

export const loginUser = async (req,res)=>{
    try{
        const response = await loginUserService(req.body)
        res.json({
            success:true,
            data:response,
            message:"Login Success"
        })
    }catch(err){
        res.status(400).json({
            success:false,
            message:err.message
        })
    }
}

export const getProfile = async (req,res) =>{  
  try{
        const response = await getProfileService(req.user.id);
        res.json({
            success:true,
            message:"Got the user profile successfully",
            data:response
        })
  }
  catch(err)
  {
        res.status(404).json({
            success:false,
            message:err.message
        })
  }
}