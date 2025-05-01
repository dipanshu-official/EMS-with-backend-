//wPIUQ8smPCtlyNFP

import mongoose from "mongoose";
 
const connectDB = async() => {
  try {
    await mongoose.connect(process.env.DATABASE_URL)
    console.log("database succusess fully connected")
    
  } catch (error) {
    console.log("🚀 ~ connectDB ~ error:", error)
    
  }
}
export default connectDB
