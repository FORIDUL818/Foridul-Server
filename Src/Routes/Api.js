import express from "express"
import { 
    Login,
    OtpVarification,
    passwordReset,
    profileDetails,
    profileUpdate,
    Ragistrtion, 
    RecoverVaryfyEmail} from "../Controller/Controller.js"
import { tokenVarify } from "../Middleware/authMiddlware.js";



const router =express.Router()
//Ragistration start
router.post("/ragistration",Ragistrtion); 
router.post("/login",Login); 
router.get("/email-recovary/:email",RecoverVaryfyEmail); 
router.get("/otp-recovary/:otp/:email",OtpVarification); 
router.post("/password-reset",passwordReset);
//Ragistration end
//profileupdate and details start
router.post("/profileupdate",tokenVarify,profileUpdate); 
router.get("/profiledetails",tokenVarify,profileDetails); 
//profileupdate and details end

// createBrand start
// router.get("brand-detials",tokenVarify,BrandDetails)
// createBrandend
export {router}