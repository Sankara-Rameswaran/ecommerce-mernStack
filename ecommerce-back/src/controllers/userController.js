import { deleteUserService, getAllUsersService, getUserByIdService, updateUserService } from "../services/userService.js";

export const getAllUsers = async (req,res) =>{
    try{
        const filter = {}
        const sort = req.query.sort || "_id"
        const order = req.query.order || "ASCE"
        const page  = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10
        if (req.query.role){
            filter.role = req.query.role
        }
        if(req.query.search){
            filter.name = {
                $regex:req.query.search,
                $options:"i"
            }
        }
        const response = await getAllUsersService(page,limit,filter,sort,order);
        res.json({
            success:true,
            data:response.users,
            pagination:response.pagination,
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

export const updateUserById = async (req,res) =>{
   try {
     const id = req.params.id;
     const data = req.body;
     const response = await updateUserService(id,data);
     res.json({
        success:true,
        data:response,
        message:"User details Updated!!!"
     })
   } catch (err) {
        res.status(404).json({
            success:false,
            message:err.message
        })
   }
}

export const deleteUser = async (req,res) =>{
    try{
        const id = req.params.id;
        const response = await deleteUserService(id);
        res.json({
            success:true,
            data:response,
            message:"User was Deleted"
        }) 
    }
    catch(err){
        res.status(404).json({
            success:false,
            message:err.message
        })
    }
}
