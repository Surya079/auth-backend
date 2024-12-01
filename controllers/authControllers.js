import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashPass = await bcrypt.hash(password, 10);
    // Fields error handle
    if (!name) {
      return res
        .status(400)
        .json({ seccess: false, message: "Name is required" });
    }
    if (!email) {
      return res
        .status(400)
        .json({ seccess: false, message: "Email is required" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ seccess: false, message: "Password is required" });
    }
    const user = await User.findOne({ email });
    // User exist check
    if (user) {
      return res
        .status(400)
        .json({ seccess: false, message: "User already exists" });
    }

    const newUser = new User({
      email: email,
      name: name,
      password: hashPass,
    });
    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.SCERET
    );
    // handle Registered succes
    res.status(200).json({
      success: true,
      message: "Registered Successfully",
      token,
    });
  } catch (error) {
    console.log(error);

    if (error instanceof Error && error.name === "MongoNetworkError") {
      res
        .status(500)
        .json({ seccess: false, message: "Network error, please try again" });
    } else {
      res
        .status(500)
        .json({ seccess: false, message: "Error while create user" });
    }
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      return res
        .status(404)
        .json({ seccess: false, message: "Password does not match" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.SCERET,
      {
        expiresIn: "5m",
      }
    );
    res.status(200).json({
      success: true,
      token,
      user: { _id: user._id, name: user.name, role: user.role },
      message: "Login Successfull",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ success: false, error: "Server Error " });
  }
};
export const verify = (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
};
