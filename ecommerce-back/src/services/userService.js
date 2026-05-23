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

export const updateUserService = async (id,data) => {

    const allowedUpdates = {}
   
    if(data.name){
        allowedUpdates.name = data.name;
    }

    if(data.phoneNumber){
        allowedUpdates.phoneNumber = data.phoneNumber;
    }

    if(data.dateOfBirth){
        allowedUpdates.dateOfBirth = data.dateOfBirth;
    }
    const updatedUser = await User.findByIdAndUpdate(id,allowedUpdates,{new:true})
    if(!updatedUser)
        throw new Error("User not Found")
    return updatedUser;
}

export const deleteUserService = async (id) =>{
    const isDeleted = await User.findByIdAndDelete(id);
    if(!isDeleted)
        throw new Error("User not found")
    return isDeleted;
}