import Product from "../models/Product.js";

export const createProductService = async (data) =>{
    const newProduct = await Product.create(data);
    return newProduct;    
}

export const getAllProductsService = async (page,limit,filter,sort,order) =>{
    
    const sortingOrder =    order === "ASC" ? 1 : -1;
    const skip = (page - 1) * limit;
    const totalProducts = await Product.countDocuments(filter);
    const totalPages =  Math.ceil(totalProducts / limit);
    const products = await Product.find(filter).sort({ [sort]: sortingOrder }).skip(skip).limit(limit);

    const transformedProducts =products.map((product)=>{
        product.images = product.images?.map((image)=>`http://localhost:5000/uploads/${image}`) || [];
        return product;
    });

    const pagination = {
        totalPages,
        totalProducts,
        currentPage:page,
        limit,
        hasNext: page < totalPages
    }

    return {
        products: transformedProducts,
        pagination
    };
}

export const getProductByIdService = async (id) => {

    const product = await Product.findById(id);

    if(!product)
        throw new Error("No product found");

    product.images =product.images?.map((image)=>`http://localhost:5000/uploads/${image}`) || [];
    return product;
}

export const updateProductByIdService =
async (id,data) =>{

    const product =
        await Product.findByIdAndUpdate(id, data,{new:true});
    if(!product)
        throw new Error("No product found");
    return product;
}

export const deleteProductByIdService = async(id)=>{

    const product =await Product.findByIdAndDelete(id);
    if(!product)
        throw new Error("No product found");
    return product;
}