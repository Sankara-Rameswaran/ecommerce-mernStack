import User from "../models/User.js"

export const getAllUsersService =async (page,limit,filter,sort,order) =>{
    const skip  = (page - 1 )* limit 
    const sortingOrder = order ==="ASCE" ? 1 : -1
    const totalUsers = await User.countDocuments(filter)
    const totalPages = Math.ceil(totalUsers / limit)
    const users = await User.find(filter).sort({[sort]:sortingOrder}).skip(skip).limit(limit)
    const hasNextPage = page < totalPages
    const pagination = {totalPages,hasNextPage,currentPage:page,limit}
    return {users,pagination};
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