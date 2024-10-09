import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchima= new mongoose.Schema({
    firstName:{type:String,
    required:true
    },
    lastName:{type:String,required:true},
    email:{type:String,
        required:true,
        unique:true,
        validate:{
            validator:function (v){
                const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(v);
                return emailRegex;
            },
            message:"input your correct email",
        }
    },
    password:{
        type:String,
        required:true,
        set:(v) => bcrypt.hashSync(v, bcrypt.genSaltSync(5)),
             
    },
    photo:String
},{versionKey:false,timestamps:true})

const userModel=mongoose.model("users",userSchima);
export {userModel}