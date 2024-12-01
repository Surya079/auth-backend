import bcrypt from "bcrypt";
import { User } from "./models/User.js";
import connectDB from "./DB/database.js";

const userRegister = async (req, res) => {
  connectDB();
  try {
    const hashPassowrd = await bcrypt.hash("SuBhu@342012", 10);

    const newUser = new User({
      name: "Surya",
      email: "surya.vme005@gmail.com",
      password: hashPassowrd,
      role: "admin",
    });
    await newUser.save();
    res.status(201).json("User has been created");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error while create user" });
  }
};

export default userRegister;
