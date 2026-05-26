import Product from "../models/Product.js"
import { createProductService, deleteProductByIdService, getAllProductsService, getProductByIdService, updateProductByIdService } from "../services/productService.js"

export const createProduct = async (req,res) =>{
    try{
        let product = req.body
        const files = req.files
        const imageNames = files.map((file)=>file.filename)
        product = {...product,images:imageNames}
        const response = await createProductService(product);
        res.status(201).json({
            success:true,
            data:response,
            message:"Product added successfully"
        })
    }catch(err)
    {
        res.json({
            success:false,
            message:err.message
        })
    }
}
export const getAllProducts = async (req,res) =>{
    const page  = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const filter = {}
    if(req.query.category)
    {
        filter.category = req.query.category
    }
    const sort  = req.query.sort || "createdAt"
    const order = req.query.order || "DESC"
    if(req.query.search){
            filter.name = {
                $regex:req.query.search,
                $options:"i"
            }
        }
    try{
        const response = await getAllProductsService(page,limit,filter,sort,order);
        res.status(200).json({
            success:true,
            data:response.products,
            pagination:response.pagination,
            message:"Fetched all products!!!"
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

export const getProductById = async (req,res) =>{
    try {
    const id = req.params.id
    const response = await getProductByIdService(id);
    res.status(200).json({
        success:true,
        data:response,
        message:"Product found !!!"
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

export const updateProductById = async(req,res) =>{
    const id = req.params.id;
    const data = req.body
    try{
        const response = await updateProductByIdService(id,data);
        res.json({
            data:response,
            success:true,
            message:"Product updated successfully!"
            
        })
    }catch(err)
    {
        res.status(404).json({
            success:false,
            message:err.message
        })
    }
}

export const deleteProduct =  async (req,res) =>{
    const id = req.params.id
    console.log(id)
    try{
        const response = await deleteProductByIdService(id);
        res.json({
            data:response,
            success:true,
            message:"Deleted successfully"
        })
    }catch(err){
        res.status(404).json({
            success:false,
            message:err.message
        })
    }
}