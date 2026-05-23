
import { getAllUsersService, getUserByIdService } from "../services/userService.js";

export const getAllUsers = async (req,res) =>{
    try{
        const response = await getAllUsersService();
        res.json({
            success:true,
            data:response,
            message:"User fetch successfully"
        })
    }catch(err)
    {
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

export const getUserById = async (req,res) =>{
    const id = req.params.id;
    try{
        const response = await getUserByIdService(id)
        res.json({
            success:true,
            data:response,
            message:"User fetch successfully"
        })
    }catch(err){
        res.status(404).json({
            success:false,
            message:err.message
        })
    }
}