import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
 import dotenv from "dotenv";
 dotenv.config();
import mongoose from "mongoose";
import { router } from "./Src/Routes/Api.js";
 dotenv.config();
const app = express();

app.use(cors())
app.use(bodyParser.json());

const mongoConnection=async()=>{
 return await mongoose.connect(process.env.MONGO_URL)
}
mongoConnection() 
.then(()=>console.log("connected mongoDB"))
.catch((err)=>console.log(err))

app.use("/api/v1",router)

app.all("*",(req,res)=>{
    res.status(404).json({status:"Bad request"})
})

export {
    app
}


 