import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect(process.env.VITE_APP_MOGO_URI).then(()=>console.log("DataBase Connected"));

}