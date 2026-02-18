import dotenv from 'dotenv'
import connectDB from "./db/index.js";
import app from './app.js';
const PORT = process.env.PORT || 8000
dotenv.config({
  path:"./env"
})

connectDB()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running at port:${PORT}`); 
    })
})
.catch((error)=>{
    throw new Error("Error:",error);
    
})
















/*
import express from "express";
const app = express();

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    app.on("error", (error) => {
      console.log("ERROR:", error);
      throw new Error(error);
    });

    app.listen(process.env.PORT, () => {
      console.log(`App is listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("ERROR:", error);
    throw new Error("ERROR", error);
  }
})();
*/