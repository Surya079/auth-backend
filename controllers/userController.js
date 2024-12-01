import { User } from "../models/User.js";

const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "client" });
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .json({ success: false, message: "Server error while getting users" });
  }
};

export default getUsers;
