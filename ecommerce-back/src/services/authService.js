import bcrypt from 'bcrypt';
import User from '../models/User.js';
import jwt from 'jsonwebtoken'
export const registerUserService = async (user) =>{
    if(await User.findOne({email:user.email}))
    {
        throw new Error("Account already exists")
    }
    const hashedPassword = await bcrypt.hash(user.password,12);
    const newUser =   await User.create({...user,password:hashedPassword})
    const objUser = newUser.toObject()
    delete objUser.password;
    return objUser;
}

export const loginUserService = async (data) => {
    const user = await User.findOne({email:data.email}).select("+password")
    if(!user){
        throw new Error("No account exists");
    }
    const isCorrect =await bcrypt.compare(data.password,user.password)
    if(!isCorrect){
        throw new Error ("Wrong Password")
    }
    const objUser = user.toObject();
    delete objUser.password;
    const token = jwt.sign({
        email : objUser.email ,
        name:objUser.name,
        role:objUser.role,
        id:objUser._id
    },process.env.JWT_SECRET_KEY,{expiresIn:"1d"}
    )
    objUser["accessToken"] = token
    return objUser;
}

export const getProfileService = async (id)=>{
        const dbUser = await User.findById(id);
        if(!dbUser)
            throw new Error(" Profile not found!!!")
        return dbUser;
}