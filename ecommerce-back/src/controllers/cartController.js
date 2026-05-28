import { addtoCartService, deleteCartService, updateCartService, viewCartService } from "../services/cartService.js"

export const addtoCart = async (req,res) =>{
    try{
        const userId = req.user.id
        const {productId,weight}  = req.body
        const response = await addtoCartService(userId,productId,weight)
        res.json({
            success:true,
            message:"Added to cart successfully!!!",
            data:response
        })
    }
    catch(err)
    {
        res.json({
            success:false,
            message:err.message
        })
    }
}

export const veiwCart = async(req,res) =>{
    try{
        const userId = req.user.id;
        const response = await viewCartService(userId)
        res.json({
            success:true,
            message:"Cart fetched successfully",
            data:response
        })
    }catch(err){
        res.json({
            success:false,
            message:err.message
        })
    }
}

export const deleteCart = async (req,res) =>{
    try{
        const userId = req.user.id
        const {productId,weight}  = req.body
        const response = await deleteCartService(userId,productId,weight)
        res.json({
            success:true,
            message:"Item deleted from the cart!!!",
            data:response
        })
    }
    catch(err)
    {
        res.json({
            success:false,
            message:err.message
        })
    }
}

export const updateCart = async (req,res) => {
    try{
        const userId = req.user.id
        const {productId,weight,action} = req.body
        const response = await updateCartService(userId,productId,weight,action);
        res.json({
            success:true,
            data:response,
            message:"Cart Updated"
        })
    }
    catch(err)
    {
        res.json({
            success:false,
            message:err.message
        })
    }
}