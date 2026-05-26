import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    basePrice:{
        type:Number,
        min:0,
        required:true
    },
    weightOptions:{
        type:[String],
        enum:["250g","500g","1kg","2kg","5kg"],
        default:["1kg"]
    },
    inStock:{
        type:Boolean,
        default:true
    },
    images:{
        type:[String],
        default:[]
    },
    category:{
        type:String,
        enum:["Sweets","Karam","Combo Packs","Sugar-Free"],
        required:true
    },
    description:{
        type:String
    }
},{
    timestamps:true
})

const Product = mongoose.model("Product", ProductSchema);
export default Product;