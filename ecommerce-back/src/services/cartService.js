import User from "../models/User.js"
import Product from "../models/Product.js";

export const addtoCartService = async(userId,productId,weight) =>{
    const user = await User.findById(userId);
    const product = await Product.findById(productId);
    if(!user)
        throw new Error("User not found")
    if(!product)
        throw new Error("Product not found")
    let cart  = user.cart;
    const isExisting = cart.find((item)=>(item.productId.toString()==productId && item.weight === weight))
    if(isExisting){
        isExisting.quantity+=1;
    }
    else
    {
        cart.push({
            productId,weight,quantity:1
        })
    }
    await user.save()
    return user.cart;
}
export const viewCartService = async(userId) =>{
    const user = await User.findById(userId).populate("cart.productId");
    if (!user)
        throw new Error("user not found")
    return user.cart;
}

export const deleteCartService = async(userId,productId,weight) =>{
    const user = await User.findById(userId);
    if(!user)
        throw new Error("User not found")
    let cart  = user.cart;
    const updatedCart = cart.filter((item)=>!(item.productId.toString()===productId && item.weight === weight))
    user.cart=updatedCart
    await user.save()
    return user.cart;
}

export const updateCartService = async(userId,productId,weight,action)=>{
    const user = await User.findById(userId);
    if(!user)
        throw new Error("User not found")
    let cartItem = user.cart.find((item)=>item.productId.toString()===productId && item.weight===weight);
    if(!cartItem)
        throw new Error("Cart item not found")
    if(action==="increase"){
        cartItem.quantity+=1;
        console.log("increases")
    }
    else if(action==="decrease"){
        cartItem.quantity-=1;
        if(cartItem.quantity===0)
        {
            user.cart=user.cart.filter((item)=>!(item.productId.toString()===productId && item.weight === weight))
        }

        
    }
    await user.save();

    return user.cart;
}