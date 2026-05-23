import User from "../models/User.js"

export const getAllUsersService =async () =>{
    const users = await User.find({})
    return users;
}

export const getUserByIdService  = async (id) =>{
    const user = await User.findById(id)
    if(!user){
        throw new Error("No user found")
    }
    return user;
}