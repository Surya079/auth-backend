import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectDB = async () => {
  try {
    const MONGO_URI = process.env.DB_URI;
    await mongoose.connect(MONGO_URI);
    console.log("Mongo DB running");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
