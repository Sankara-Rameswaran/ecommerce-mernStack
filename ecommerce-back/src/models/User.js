import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    dateOfBirth:{
        type:Date,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        select:false
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER"
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    phoneNumber:{
        type:String
    },
    cart:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product",
                required:true
            },
            weight:{
                type:String,
                enum:["250g","500g","1kg","2kg","5kg"],
                required:true
            },
            quantity:{
                type:Number,
                default:1,
                min:1
            }        
        }
    ]
},{timestamps:true})

const User = mongoose.model("User",UserSchema)

export default User;