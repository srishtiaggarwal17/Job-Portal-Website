import mongoose from "mongoose";
import dotenv from "dotenv";
import { Company } from "../models/company.model.js"; 

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongodb connected successfully");
    await Company.syncIndexes();
    console.log("Company indexes synced successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB or syncing indexes:", error);
  }
};

export default connectDB;


