import { userModel } from "../MOdel/userModel/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SendEmailUtility } from "../Utility/sendMail.js";
import { OtpModel } from "../MOdel/userModel/otpModel.js";

  //Ragistration start
  const Ragistrtion=async(req,res)=>{
      try {
          const {firstName,lastName,email,password}=req.body;
          const userdata=await userModel.create({firstName,lastName,email,password})
          res.status(200).json({status:"success",data:userdata})
        } catch (error) {
            res.status(401).json({status:"fail",data:error})
        }
    }
    //Ragistration end
  // login start
  const Login=async(req,res)=>{
      try {
          const {email,password}=req.body;
          const userdata=await userModel.findOne({email});
          
          if(!userdata){
              return res.status(401).json({status:"Email is not match"})
            }
            const isloginPassword= await bcrypt.compare(password,userdata.password);
            if(!isloginPassword){
                return res.status(401).json({status:"Password is not match"})
            }
            else{
                let payload = { exp: Math.floor(Date.now() / 1000) + (60 * 60*24), data: userdata.email };
                let token = jwt.sign(payload, process.env.JWT_SECRET);
                res.status(200).json({ status: "success", data: userdata, Token: token});
            }
        } catch (error) {
            res.status(401).json({status:"fail",data:error})
        }
    }
    // login end

      // profile update start
       const profileUpdate=async(req,res)=>{
        try {
            const email=req.headers.email;
            const body=req.body;
           const query={email}
            const user=await userModel.updateOne(query,body)

            if(user.matchedCount===0){
                res.status(401).json({status:"User not found"})
            }
            res.status(200).json({status:"success",data:user})
        } catch (error) {
            res.status(401).json({status:"fail",data:error})
        }
       }
      // profile update end

      // profileDeatials start
         const profileDetails=async (req,res)=>{
            try {
                const email=req.headers.email;
                const query={email}
                const user= await userModel.findOne(query)
              if(user){
                res.status(200).json({status:user});
              }
              else{
                res.status(401).json({status:"fail",message:"user Not found"})
              }
            } catch (error) {
                res.status(401).json({status:"fail",data:error})
            }
         }
      // profileDeatials end

      // email recovary start
     const RecoverVaryfyEmail = async (req, res) => {
        try {
            const email = req.params.email;
            const otp = Math.floor(Math.random() * 1000000); // Generate a random OTP
    
            const user = await userModel.findOne({ email });
            if (!user) {
                return res.status(200).json({ status: "fail", data:"User not found" });
            }
    
            // Create a new entry in the OtpModel to store the OTP
            const createdOtp = await OtpModel.create({email,otp});
    
            // Send the OTP via email
            const sendMailResult = await SendEmailUtility(email, `Your OTP for account recovery: ${otp}`, "Account Recovery OTP");
    
            return res.status(200).json({
                status: "success",
                data: "Email and OTP verification sent successfully",
                 sendMailResult: sendMailResult,
                 createdOtp:createdOtp
            });
        } catch (err) {
            res.status(200).json({ status: "failed", data: err.message });
        }
    };
      // email recovary end


// Backend: Verify OTP Request
const OtpVarification = async (req, res) => {
    try {
      const { email, otp } = req.params;
      const status = 0; // Default status before verification
      const statusUpdate = 1; // Status after successful verification
  
      const otpCheck = await OtpModel.aggregate([
        { $match: { email, otp, status } },
        { $count: "total" }
      ]);
  
      if (otpCheck.length > 0) {
        const otpUpdate = await OtpModel.updateOne(
          { email, otp },
          { status: statusUpdate }
        );
        return res.status(200).json({ status: "success", data: otpUpdate });
      } else {
        return res.status(400).json({ status: "failed", data: "Invalid OTP" });
      }
    } catch (err) {
      return res.status(400).json({ status: "failed", data: err.message });
    }
  };

// OtpVarification end

// password reset start
 const passwordReset=async(req,res)=>{
   
  try{
    let email=req.body.email;
    let otp=req.body.otp;
    let statusUpdate=1
    let newPassword=req.body.password
let otpchack=await OtpModel.aggregate(
    [
        {$match:{email:email,otp:otp,status:statusUpdate}},
        {$count:"total"}
      ]
     )
     if(otpchack.length>0){
     let updatePassword=await userModel.updateOne({email:email},{password:newPassword})
     res.status(200).json({status:"success",data:updatePassword})
    }
  else{
    res.status(200).json({status:"fail",data:"something rong"})
  }
}
catch(err){
res.status(200).status({status:"faild",data:err})
}
}
// password reset end
export {Ragistrtion,
    Login,
    profileUpdate,
    profileDetails,
    RecoverVaryfyEmail,
    OtpVarification,
    passwordReset
}