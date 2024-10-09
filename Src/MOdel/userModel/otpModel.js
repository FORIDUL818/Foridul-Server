import mongoose from "mongoose";


const Otpschema=new mongoose.Schema({
 email:{type:String},
 otp:{type:String},
 status:{type:Number,default:0},
 createDate:{type:Date,default:Date.now()}
},{versionKey:false})

const OtpModel=mongoose.model("otps",Otpschema)
export {OtpModel}
