import mongoose from "mongoose";
import env from "dotenv";

env.config();
const connectDB = async () => {
  try {
    const MONGO_URI = process.env.DB_URI;
    mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongo DB runnnig");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
